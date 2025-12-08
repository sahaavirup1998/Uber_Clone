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