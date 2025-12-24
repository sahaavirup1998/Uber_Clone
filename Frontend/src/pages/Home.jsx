import React, { useState, useRef, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
      console.log("Joined socket room as user:", user._id);
    }
  }, [user, socket]);

  socket.on('ride-confirmed', ride => {
    setVehiclePanelOpen(false);
    setWaitingForDriverPanel(true);
    setRide(ride);
  });

  socket.on('ride-started', ride => {
    setWaitingForDriverPanel(false);
    alert('Your ride has started!');
    navigate('/riding', {state: {ride: ride}});
  })

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (!value || value.trim().length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value.trim() },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPickupSuggestions(response.data);
    } catch (error) {
      console.error("Pickup suggestions error:", error.response?.data);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (!value || value.trim().length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value.trim() },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error("Destination suggestions error:", error.response?.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          paddingTop: "20px",
          paddingRight: "24px",
          paddingLeft: "24px",
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(panelClose.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(panelClose.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (lookingForDriverPanel) {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    [lookingForDriverPanel]
  );

  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    [waitingForDriverPanel]
  );

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination, vehicleType },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data.fares);
    console.log("FARES", response.data.fares);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="bg-white p-5 relative">
          <h5
            ref={panelClose}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={handleSubmit}>
            <div className="line absolute bg-gray-700 top-[45%] h-16 w-1 left-7 rounded-full"></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter Pickup Location"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter Drop Location"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div className="h-0 bg-white" ref={panelRef}>
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 pt-12 py-10 bg-white translate-y-full"
      >
        <VehiclePanel
          fare={fare}
          selectVehicleType={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div
        ref={confirmedRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 pt-12 py-6 bg-white translate-y-full"
      >
        <ConfirmedRide
          fare={fare}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setLookingForDriverPanel={setLookingForDriverPanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div
        ref={lookingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 px-3 pt-12 py-6 bg-white translate-y-full"
      >
        <LookingForDriver
          fare={fare}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          createRide={createRide}
          setLookingForDriverPanel={setLookingForDriverPanel}
        />
      </div>
      <div
        ref={waitingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 px-3 pt-12 py-6 bg-white"
      >
        <WaitingForDriver 
          waitingForDriverPanel={waitingForDriverPanel} 
          ride={ride} 
          setVehiclePanelOpen={setVehiclePanelOpen}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
        />
      </div>
    </div>
  );
};

export default Home;