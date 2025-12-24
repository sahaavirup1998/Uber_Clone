import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: props.ride?._id, // This is the 'data' body
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error ending ride:", error);
      // Optional: add UI feedback here (e.g., toast or alert)
    }
  }

  return (
    <div>
      <h5
        onClick={() => props.setFinishRidePanel(false)}
        className="absolute w-[93%] p-1 text-center top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://icon2.cleanpng.com/20180529/bxp/avpqkaq1b.webp"
            alt="rider image"
          />
          <h2 className="font-semibold text-lg">
            {props.rideData?.user?.fullname.firstname}
          </h2>
        </div>
        <h5 className="font-semibold text-lg">3.1km</h5>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-2xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="font-bold text-xl">Pickup</h3>
              <p className="text-gray-600 text-sm">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-2xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="font-bold text-xl">Destination</h3>
              <p className="text-gray-600 text-sm">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-2xl ri-currency-line"></i>
            <div>
              <h3 className="font-bold text-xl">₹{props.ride?.fare}</h3>
              <p className="text-gray-600 text-sm">Cash cash</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <button
            onClick={endRide}
            className="w-full flex justify-center mt-5 bg-green-500 text-white p-3 rounded-lg font-semibold"
          >
            Finish Ride
          </button>
          {/* <p className='text-xs text-red-500 font-medium mt-2 text-center'>Click on Finish Ride button to end this trip if you completed the payement. You will be redirected to the captain riding page.</p> */}
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
