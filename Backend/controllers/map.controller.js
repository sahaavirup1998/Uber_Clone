const { validationResult } = require('express-validator');
const mapService = require('../services/map.services.js');

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);

    if (coordinates) {
      // ✅ Return only lat/lng
      return res.status(200).json({
        lat: coordinates.lat,
        lng: coordinates.lng
      });
    } else {
      return res.status(404).json({
        message: `No coordinates found for address: ${address}`
      });
    }

  } catch (err) {
    console.error('Error in getCoordinates controller:', err.message);
    return res.status(500).json({
      message: 'Failed to get coordinates',
      error: err.message
    });
  }
};