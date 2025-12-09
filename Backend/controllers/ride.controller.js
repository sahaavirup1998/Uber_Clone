const rideService = require('../services/ride.services');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType
    });

    const hours = Math.floor(ride.duration / 60);
    const minutes = ride.duration % 60;

    return res.status(201).json({
      ride: {
        id: ride._id,
        pickup: ride.pickup,
        destination: ride.destination,
        distance: `${ride.distance.toFixed(2)} km`,
        time: `${hours} hr ${minutes} min`,
        fare: `₹${ride.fare.toFixed(2)}`,
        otp: ride.otp,
        status: ride.status
      }
    });
  } catch (error) {
    console.error('createRide error:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fares = await rideService.getFare(pickup, destination);

    return res.status(200).json({
      fares
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};