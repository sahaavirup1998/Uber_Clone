const rideService = require('../services/ride.services');
const mapServices = require('../services/map.services');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

// Create Ride Controller
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

    res.status(201).json({
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

    const pickupCoordinates = await mapServices.getAddressCoordinate(pickup);
    console.log(pickupCoordinates);
    
    const captainsInRadius = await mapServices.getCaptainInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);
    
    ride.otp = "";

    const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

    captainsInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId,{
        type: 'new-ride',
        data: rideWithUser
      })
    })

  } catch (error) {
    console.error('createRide error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Get fare between pickup and destination
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

// Confirm Ride Controller
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({rideId, captainId: req.captain});

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    });

    return res.status(200).json({
      message: 'Ride confirmed successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Start Ride Controller
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide(rideId, otp, captain=req.captain);

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    });

    return res.status(200).json({
      message: 'Ride started successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// End Ride Controller
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({rideId, captain:req.captain});

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-ended',
      data: ride
    });

    return res.status(200).json({
      message: 'Ride ended successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}