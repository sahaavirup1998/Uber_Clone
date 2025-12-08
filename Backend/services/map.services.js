const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        // ✅ Use a real, descriptive User-Agent per Nominatim’s usage policy
        'User-Agent': 'UberCloneApp/1.0 (contact: sahaavirup1998@gmail.com)',
        'Accept-Language': 'en',
        'Referer': 'http://localhost:5001'
      },
      timeout: 5000 // optional: avoid hanging if API doesn’t respond
    });

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon)
      };
    } else {
      throw new Error(`Unable to fetch coordinates for address: ${address}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

// 📏 Calculate distance (Haversine formula)
module.exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // km
};

// Get address suggestions
module.exports.fetchAddressSuggestions = async (query) => {
  const url = "https://nominatim.openstreetmap.org/search";

  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 15,
        extratags: 1,
        namedetails: 1
      },
      headers: {
        "User-Agent": "UberCloneApp/1.0 (contact: sahaavirup1998@gmail.com)",
      },
    });

    // 🔥 remove duplicate names
    const unique = new Map();

    response.data.forEach((item) => {
      const name = item.display_name;
      if (!unique.has(name)) {
        unique.set(name, {
          name,
          lat: item.lat,
          lon: item.lon,
          type: item.type,          // 🔥 also return place type
          category: item.class      // 🔥 building, tourism, railway etc.
        });
      }
    });

    return Array.from(unique.values());

  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw error;
  }
};
