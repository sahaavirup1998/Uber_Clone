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
        const minutes = Math.round(ride.duration % 60);

        return res.status(201).json({
            ride: {
                id: ride._id,
                pickup: ride.pickup,
                destination: ride.destination,
                distance: `${Number(ride.distance).toFixed(2)} km`,
                time: `${hours} hr ${minutes} min`,
                fare: `₹${Number(ride.fare).toFixed(2)}`,
                otp: ride.otp,
                status: ride.status
            }
        });
    } catch (error) {
        console.error('createRide error:', error);
        return res.status(500).json({ error: error.message });
    }
};
