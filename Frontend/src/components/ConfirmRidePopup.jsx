import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <div>
            <h5 onClick={() => props.setConfirmRidePopupPanel(false)} className='absolute w-[93%] p-1 text-center top-0'><i className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
            <h3 className='font-semibold text-2xl mb-5'>Confirm this ride to start</h3>
            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='https://icon2.cleanpng.com/20180529/bxp/avpqkaq1b.webp' alt='rider image' />
                    <h2 className='font-semibold text-lg capitalize'>{props.ride?.user?.fullname.firstname}</h2>
                </div>
                <h5 className='font-semibold text-lg'>3.1km</h5>
            </div>
            <div className='flex gap-2 justify-between items-center flex-col'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <i className='text-2xl ri-map-pin-2-fill'></i>
                        <div >
                            <h3 className='font-bold text-xl'>Pickup</h3>
                            <p className='text-gray-600 text-sm'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <i className='text-2xl ri-map-pin-user-fill'></i>
                        <div >
                            <h3 className='font-bold text-xl'>Destination</h3>
                            <p className='text-gray-600 text-sm'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='text-2xl ri-currency-line'></i>
                        <div >
                            <h3 className='font-bold text-xl'>₹{props.ride?.fare}</h3>
                            <p className='text-gray-600 text-sm'>Cash cash</p>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-4'>
                    <form onSubmit={handleSubmit}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type='number' placeholder='Enter OTP' className='bg-[#eee] px-6 py-4 text-base font-mono rounded-lg w-full' />
                        <button className='w-full flex justify-center mt-5 bg-green-500 text-white p-3 rounded-lg text-lg font-semibold'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false);
                        }} className='w-full mt-1 bg-red-600 text-white text-lg p-3 rounded-lg font-semibold'>Cancel</button>
                    </form>
                    
                </div>
                
            </div>
        </div>
    )
}

export default ConfirmRidePopup