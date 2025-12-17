const { send } = require("process");
const rideModel = require("../models/ride.model");
const mapService = require("./map.services");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

// 🔹 calculate fare for ALL vehicle types
async function getFare(pickup, destination) {
  const { distance, time } = await mapService.getDistanceAndTime(
    pickup,
    destination
  );

  if (
    typeof distance !== "number" ||
    typeof time !== "number" ||
    distance <= 0 ||
    time <= 0
  ) {
    throw new Error("Invalid distance or time from map service");
  }

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fares = {
    auto: Number(
      (
        baseFare.auto +
        distance * perKmRate.auto +
        time * perMinuteRate.auto
      ).toFixed(2)
    ),
    car: Number(
      (
        baseFare.car +
        distance * perKmRate.car +
        time * perMinuteRate.car
      ).toFixed(2)
    ),
    motorcycle: Number(
      (
        baseFare.motorcycle +
        distance * perKmRate.motorcycle +
        time * perMinuteRate.motorcycle
      ).toFixed(2)
    ),
  };

  return {
    fares,
    distanceKm: Number(distance.toFixed(2)),
    durationMinutes: Number(Math.ceil(time)),
  };
}

module.exports.getFare = getFare;

function getOtp(num) {
  return crypto.randomInt(10 ** (num - 1), 10 ** num).toString();
}

// 🔹 create ride using selected vehicleType
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All parameters are required to create a ride.");
  }

  const { fares, distanceKm, durationMinutes } = await getFare(
    pickup,
    destination
  );

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp: getOtp(6),
    fare: fares[vehicleType],
    distance: distanceKm,
    duration: durationMinutes,
    status: "pending",
  });

  return ride;
};

// 🔹 confirm ride by captain
module.exports.confirmRide = async (rideId, captain) => {
  if (!rideId) {
    throw new Error("Ride ID is required to confirm a ride.");
  }

  await rideModel.findOneAndUpdate({
    _id: rideId},
    {
      status: 'accepted',
      captain: captain._id
    }
  )

  const ride = await rideModel.findOne({
    _id: rideId,
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Ride not found or already confirmed.");
  }
  return ride;
};

// 🔹 start ride by captain
module.exports.startRide = async (rideId, otp, captain) => {
  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required to start a ride.");
  }

  const ride = await rideModel.findOne({
    _id: rideId,
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Invalid ride ID, OTP, or ride not accepted yet.");
  }

  if(ride.status !== 'accepted') {
    throw new Error("Ride not accepted yet.");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP provided.");
  }

  await rideModel.findOneAndUpdate({
    _id: rideId},
    {
      status: 'ongoing',
    }
  )

  sendMessageToSocketId(ride.user.socketId, {
    event: 'ride-started',
    data: ride
  });
  
  return ride;
}