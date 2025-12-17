import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!captain || !captain._id) return; // Wait until captain data is available

    socket.emit("join", { userType: "captain", userId: captain._id });
    console.log("Captain joined socket room:", captain._id);

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const locationData = {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          };
          console.log("Updating location:", locationData);
          socket.emit("update-location-captain", locationData);
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => {
      clearInterval(locationInterval);
      socket.emit("leave", { userType: "captain", userId: captain._id });
    };
  }, [captain?._id, socket]);

  socket.on('new-ride', (data) => {
    console.log('New ride received:', data);
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(false);
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="h-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg cursor-pointer"
        >
          <i className="text-xl font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber Animation"
        />
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopup
          ride = {ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopup
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
