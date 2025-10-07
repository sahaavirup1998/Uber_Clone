import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    useGSAP(function() {
        if(finishRidePanel) {
        gsap.to(finishRidePanelRef.current, { 
            transform: 'translateY(0%)',
            duration: 0.5,
            ease: 'power3.out'
        });
        } else {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)',
            duration: 0.5,
            ease: 'power3.out'
        });
        }
    }, [finishRidePanel]);

    return (
        <div className='h-screen'>
            <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
                <img className='h-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-lg cursor-pointer'>
                    <i className='text-xl font-bold ri-logout-box-r-line'></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' alt="Uber Animation" />
            </div>
            <div onClick={() => setFinishRidePanel(true)} className='h-1/5 p-4 bg-yellow-400 flex justify-center items-center flex-col gap-3 relative'>
                <h5 className='absolute w-[95%] p-2 text-center top-0'><i className='text-xl text-black ri-arrow-up-wide-line'></i></h5>
                <h4 className='text-xl mt-3 font-semibold text-gray-800'>5km's away</h4>
                <button className='bg-green-500 text-white p-3 px-8 rounded-lg font-semibold w-[90%]'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide setFinishRidePanel = {setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding
