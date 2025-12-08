const rideModel = require('../models/ride.model');
const mapService = require('./map.services');

/**
 * ✅ Fare calculation (units are FIXED)
 * distanceKm -> number (km)
 * durationMinutes -> number (minutes)
 */
async function getFare(pickup, destination, vehicleType) {
  const { distance, time } = await mapService.getDistanceAndTime(
    pickup,
    destination
  );

  if (
    typeof distance !== 'number' ||
    typeof time !== 'number' ||
    distance <= 0 ||
    time <= 0
  ) {
    throw new Error('Invalid distance or time from map service');
  }

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5
  };

  const fare =
    baseFare[vehicleType] +
    distance * perKmRate[vehicleType] +
    time * perMinuteRate[vehicleType];

  return {
    fare: Number(fare.toFixed(2)),
    distanceKm: Number(distance.toFixed(2)),
    durationMinutes: Number(Math.ceil(time))
  };
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All parameters are required to create a ride.');
  }

  const { fare, distanceKm, durationMinutes } = await getFare(
    pickup,
    destination,
    vehicleType
  );

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare,
    distance: distanceKm,
    duration: durationMinutes,
    status: 'pending'
  });

  return ride;
};
