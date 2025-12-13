import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            alt="profile image"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain?.fullname?.firstname
              ? `${captain.fullname.firstname} ${captain.fullname.lastname}`
              : "Loading..."}
          </h4>
        </div>
        <div>
          <h4 className="text-lg font-medium">₹300.55</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex align-center justify-between p-4 bg-gray-100 rounded-lg mt-4">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h4 className="text-lg font-medium">10.2</h4>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h4 className="text-lg font-medium">30.2k</h4>
          <p className="text-sm text-gray-600">Km Driven</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h4 className="text-lg font-medium">10.2</h4>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
