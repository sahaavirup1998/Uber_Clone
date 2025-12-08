const { validationResult } = require('express-validator');
const mapService = require('../services/map.services.js');

// controller to get coordinates for a given address
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

// controller to get distance and time between origin and destination
module.exports.getDistanceAndTime = async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({
      message: 'Both origin and destination are required.'
    });
  }

  try {
    // 1️⃣ Get coordinates
    const originCoords = await mapService.getAddressCoordinate(origin);
    const destinationCoords = await mapService.getAddressCoordinate(destination);

    // 2️⃣ Calculate distance (now using the service function)
    const distance = mapService.calculateDistance(
      originCoords.lat,
      originCoords.lng,
      destinationCoords.lat,
      destinationCoords.lng
    );

    // 3️⃣ Estimate travel time
    const avgSpeed = 40; // km/h
    const timeInHours = distance / avgSpeed;
    const timeInMinutes = Math.round(timeInHours * 60);

    // 4️⃣ Send result
    return res.status(200).json({
      origin,
      destination,
      distance: distance.toFixed(2) + ' km',
      estimatedTime: timeInMinutes + ' mins'
    });

  } catch (error) {
    console.error('Error in getDistanceAndTime:', error.message);
    return res.status(500).json({
      message: 'Failed to calculate distance and time',
      error: error.message
    });
  }
};

// controller to get address suggestions
module.exports.getSuggestions = async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Query parameter is required",
    });
  }

  try {
    const suggestions = await mapService.fetchAddressSuggestions(query);

    return res.status(200).json({
      success: true,
      count: suggestions.length,
      suggestions,
    });
  } catch (error) {
    console.error("Error in getSuggestions:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch suggestions",
      error: error.message,
    });
  }
};