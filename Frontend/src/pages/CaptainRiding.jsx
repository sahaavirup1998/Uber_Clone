import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
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
            <div className='h-1/5 p-4 bg-yellow-400 flex justify-center items-center flex-col gap-3 relative'>
                <h5 className='absolute w-[95%] p-2 text-center top-0'><i className='text-xl text-black ri-arrow-up-wide-line'></i></h5>
                <h4 className='text-xl mt-3 font-semibold text-gray-800'>5km's away</h4>
                <button className='bg-green-500 text-white p-3 px-8 rounded-lg font-semibold w-[90%]'>Complete Ride</button>
            </div>
        </div>
    )
}

export default CaptainRiding
