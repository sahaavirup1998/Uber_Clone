import React, {useState, useRef} from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelClose = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useGSAP(function() {
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.5, 
        ease: 'power3.out'
      });
      gsap.to(panelClose.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5, 
        ease: 'power3.out',
      });
      gsap.to(panelClose.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  return (
    <div className='relative h-screen'>
      <img className='w-16 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' alt="Uber Animation" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] bg-white p-5 relative'>
          <h5 ref={panelClose} onClick={() => setPanelOpen(false)} className="absolute opacity-0 top-6 right-6 text-2xl"><i className='ri-arrow-down-wide-line'></i></h5>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={handleSubmit}>
            <div className='line absolute bg-gray-700 top-[45%] h-16 w-1 left-7 rounded-full'></div>
            <input value={pickup} onChange={(e) => setPickup(e.target.value)} onClick={() => setPanelOpen(true)} className='bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Enter Pickup Location' />
            <input value={destination} onChange={(e) => setDestination(e.target.value)} onClick={() => setPanelOpen(true)} className='bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter Drop Location' />
          </form>
        </div>
        <div className='h-[70%] p-5 h-0 bg-white' ref={panelRef}>

        </div>
      </div>
    </div>
  )
}

export default Home
