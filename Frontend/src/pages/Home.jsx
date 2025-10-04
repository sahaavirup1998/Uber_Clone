import React, {useState, useRef} from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const vehiclePanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useGSAP(function() {
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        paddingTop: '20px',
        paddingRight: '24px',
        paddingLeft: '24px',
        duration: 0.5, 
        ease: 'power3.out'
      });
      gsap.to(panelClose.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        duration: 0.5, 
        ease: 'power3.out',
      });
      gsap.to(panelClose.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(function() {
    if(vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  }, [vehiclePanelOpen]);

  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' alt="Uber Animation" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='bg-white p-5 relative'>
          <h5 ref={panelClose} onClick={() => setPanelOpen(false)} className="absolute opacity-0 top-6 right-6 text-2xl"><i className='ri-arrow-down-wide-line'></i></h5>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={handleSubmit}>
            <div className='line absolute bg-gray-700 top-[45%] h-16 w-1 left-7 rounded-full'></div>
            <input value={pickup} onChange={(e) => setPickup(e.target.value)} onClick={() => setPanelOpen(true)} className='bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Enter Pickup Location' />
            <input value={destination} onChange={(e) => setDestination(e.target.value)} onClick={() => setPanelOpen(true)} className='bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter Drop Location' />
          </form>
        </div>
        <div className='h-0 bg-white' ref={panelRef}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 px-3 py-8 bg-white translate-y-full'>
        <h3 className='font-semibold text-2xl mb-3'>Choose a ride</h3>
        <div className='w-full border-2 active:border-black rounded-xl flex items-center justify-between p-3 mb-2'>
          <img className='h-12' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' alt='uber car logo' />
          <div className=' w-1/2'>
            <h4 className='font-medium text-lg'>UberGo<span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-base'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='font-semibold text-lg'>₹193.23</h2>
        </div>
        <div className='w-full border-2 active:border-black rounded-xl flex items-center justify-between p-3 mb-2'>
          <img className='h-12' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n' alt='uber bike logo' />
          <div className=' w-1/2'>
            <h4 className='font-medium text-lg'>Moto<span><i className='ri-user-3-fill'></i>1</span></h4>
            <h5 className='font-medium text-base'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
          </div>
          <h2 className='font-semibold text-lg'>65.30</h2>
        </div>
        <div className='w-full border-2 active:border-black rounded-xl flex items-center justify-between p-3 mb-2'>
          <img className='h-12' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n' alt='uber car logo' />
          <div className=' w-1/2'>
            <h4 className='font-medium text-lg'>UberAuto<span><i className='ri-user-3-fill'></i>3</span></h4>
            <h5 className='font-medium text-base'>5 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
          </div>
          <h2 className='font-semibold text-lg'>₹101.78</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
