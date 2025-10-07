import React from 'react'
import 'remixicon/fonts/remixicon.css'

const RidePopup = (props) => {
    return (
        <div>
            <h5 onClick={() => props.setRidePopupPanel(false)} className='absolute w-[93%] p-1 text-center top-0'><i className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
            <h3 className='font-semibold text-2xl mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='https://icon2.cleanpng.com/20180529/bxp/avpqkaq1b.webp' alt='rider image' />
                    <h2 className='font-semibold text-lg'>Rider Rider</h2>
                </div>
                <h5 className='font-semibold text-lg'>3.1km</h5>
            </div>
            <div className='flex gap-2 justify-between items-center flex-col'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <i className='text-2xl ri-map-pin-2-fill'></i>
                        <div >
                            <h3 className='font-bold text-xl'>American Express</h3>
                            <p className='text-gray-600 text-sm'>Bagmane Tech Park, Bangalore, 560045</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2 p-3'>
                        <i className='text-2xl ri-map-pin-user-fill'></i>
                        <div >
                            <h3 className='font-bold text-xl'>American Express</h3>
                            <p className='text-gray-600 text-sm'>Bagmane Tech Park, Bangalore, 560045</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                       <i className='text-2xl ri-currency-line'></i>
                        <div >
                            <h3 className='font-bold text-xl'>₹193</h3>
                            <p className='text-gray-600 text-sm'>Cash cash</p>
                        </div>
                    </div>
                </div>
                <div className='flex item-center justify-center gap-4 mt-5'>
                    <button onClick={() => {
                        props.setRidePopupPanel(false);
                    }} className='bg-gray-300 text-gray-700 p-3 px-8 rounded-lg font-semibold'>Ignore</button>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true);
                        props.setRidePopupPanel(false);
                    }} className='bg-green-500 text-white p-3 px-8 rounded-lg font-semibold'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopup