const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
	const apiKey = process.env.GOOGLE_MAPS_API_KEY;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

	try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding failed: ${data.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching geocode: ${error.message}`);
    }
    
};