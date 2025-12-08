const axios = require('axios');
const http = require('http');
const https = require('https');

const axiosInstance = axios.create({
  timeout: 8000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  headers: {
    'User-Agent': 'UberCloneApp/1.0 (contact: sahaavirup1998@gmail.com)',
    'Accept-Language': 'en'
  }
});

/** list of city hints to try when geocoding ambiguous short names */
const INDIA_CITY_HINTS = [
  'Bengaluru',
  'Mumbai',
  'New Delhi',
  'Kolkata',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Noida',
  'Gurgaon'
];

async function geocodeOnce(query) {
  const res = await axiosInstance.get(
    'https://nominatim.openstreetmap.org/search',
    {
      params: {
        q: query,
        format: 'json',
        limit: 1,
        countrycodes: 'in'
      }
    }
  );

  if (!res.data || res.data.length === 0) return null;

  const item = res.data[0];
  const lat = Number(item.lat);
  const lon = Number(item.lon);

  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
  return { lat, lng: lon, display_name: item.display_name };
}

// get coordinates (lat,lng) for an address with multiple attempts
module.exports.getAddressCoordinate = async (
  address,
  city = '',
  country = 'India'
) => {
  if (!address) throw new Error('Address is required');

  // candidate queries in order of preference
  const queries = [
    [address, city, country].filter(Boolean).join(', '),
    [address, country].join(', '),
    address
  ].filter(Boolean);

  for (const q of queries) {
    try {
      const p = await geocodeOnce(q);
      if (p) return p;
    } catch (e) {
      // continue trying next query
      continue;
    }
  }

  // if still not found, try a few major cities to disambiguate short names
  for (const hintCity of INDIA_CITY_HINTS) {
    try {
      const q = [address, hintCity, country].join(', ');
      const p = await geocodeOnce(q);
      if (p) {
        // include the hint in returned display_name for logging
        return { ...p, display_name: `${p.display_name} (hint:${hintCity})` };
      }
    } catch (_) { /* ignore and continue */ }
  }

  throw new Error(`No coordinates found for "${address}"`);
};

async function osrmRouteDistance(p1, p2) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${p1.lng},${p1.lat};${p2.lng},${p2.lat}?overview=false&annotations=duration,distance`;
    const res = await axiosInstance.get(url);
    if (!res.data || !res.data.routes || res.data.routes.length === 0) return null;
    const route = res.data.routes[0];
    return { distanceKm: route.distance / 1000, durationMin: route.duration / 60, raw: route };
  } catch (err) {
    // don't crash — return null to indicate failure to route
    return null;
  }
}

// get distance (km) and time (minutes) between two addresses
module.exports.getDistanceAndTime = async (pickup, destination, city = '') => {
  if (!pickup || !destination) throw new Error('pickup and destination required');

  // helper to format debug
  const debugLog = (...args) => {
    try { console.debug('[map.service]', ...args); } catch (_) {}
  };

  // 1) try fast path
  const p1 = await module.exports.getAddressCoordinate(pickup, city);
  const p2 = await module.exports.getAddressCoordinate(destination, city);

  debugLog('Fast geocode results:', { pickup: p1, destination: p2 });

  const route1 = await osrmRouteDistance(p1, p2);

  if (route1 && route1.distanceKm > 0 && route1.distanceKm < 200) {
    // reasonable, return it
    debugLog('Using fast route', route1);
    return {
      distance: Number(route1.distanceKm.toFixed(2)),
      time: Math.ceil(route1.durationMin)
    };
  }

  // If we reach here: route1 is missing or suspiciously large.
  debugLog('Fast route suspicious or missing:', route1 ? route1.distanceKm : 'no-route');

  // 2) Build candidate geocodes (attempt each address with multiple hints)
  const pickupCandidates = [];
  const destCandidates = [];

  // include first-fast candidates
  if (p1) pickupCandidates.push(p1);
  if (p2) destCandidates.push(p2);

  // fetch a few alternative candidates using city hints
  for (const hintCity of INDIA_CITY_HINTS) {
    try {
      const a = await geocodeOnce([pickup, hintCity, 'India'].join(', '));
      const b = await geocodeOnce([destination, hintCity, 'India'].join(', '));
      if (a) pickupCandidates.push(a);
      if (b) destCandidates.push(b);
    } catch (_) { /* ignore */ }
    // small optimization: stop early if we have a few each
    if (pickupCandidates.length >= 3 && destCandidates.length >= 3) break;
  }

  // deduplicate by lat+lng
  const uniqueByCoords = (arr) => {
    const seen = new Set();
    return arr.filter((c) => {
      const key = `${c.lat}|${c.lng}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const pCandidates = uniqueByCoords(pickupCandidates);
  const dCandidates = uniqueByCoords(destCandidates);

  debugLog('Candidates:', { pCandidates, dCandidates });

  // 3) Try all pairs and pick best (smallest reasonable OSRM distance)
  let best = null;
  for (const a of pCandidates) {
    for (const b of dCandidates) {
      // skip identical coordinates
      if (a.lat === b.lat && a.lng === b.lng) continue;
      const r = await osrmRouteDistance(a, b);
      if (!r) continue;
      debugLog('Try pair', { a: a.display_name || a, b: b.display_name || b, r });
      if (!best || (r.distanceKm < best.distanceKm)) {
        best = { a, b, distanceKm: r.distanceKm, durationMin: r.durationMin };
      }
    }
  }

  if (best && best.distanceKm > 0 && best.distanceKm < 1000) {
    debugLog('Selected best candidate route', best);
    return {
      distance: Number(best.distanceKm.toFixed(2)),
      time: Math.ceil(best.durationMin)
    };
  }

  // If no valid route found, return what we can (even if long) or throw
  if (route1) {
    // return route1 but flag it
    debugLog('Returning original route despite suspicion', route1);
    return {
      distance: Number(route1.distanceKm.toFixed(2)),
      time: Math.ceil(route1.durationMin)
    };
  }

  throw new Error('Unable to compute a reasonable route between pickup and destination');
};

// fetch address suggestions for autocomplete
module.exports.fetchAddressSuggestions = async (query) => {
  if (!query) return [];
  const res = await axiosInstance.get('https://nominatim.openstreetmap.org/search', {
    params: { q: query, format: 'json', addressdetails: 1, limit: 10, countrycodes: 'in' }
  });
  if (!res.data) return [];
  return res.data.map((item) => ({
    name: item.display_name,
    lat: Number(item.lat),
    lon: Number(item.lon),
    type: item.type,
    category: item.class
  }));
};
