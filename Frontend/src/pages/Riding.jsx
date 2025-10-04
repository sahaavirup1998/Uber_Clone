import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 bg-white flex items-center justify-center top-3 left-3 rounded-full shadow-lg cursor-pointer'>
                <i className='text-xl font-bold ri-home-5-line'></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' alt="Uber Animation" />
            </div>
            <div className='h-1/2 p-5'>
                <div className='flex gap-2 justify-between items-center'>
                    <img className='h-16' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' alt='uber car logo' />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Driver</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>AP21 LD 4589</h4>
                        <p className='text-gray-600 text-sm'>Maruti Suzuki Swift Dezire</p>
                    </div>
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
                        <div className='flex items-center gap-5 p-3'>
                            <i className='text-2xl ri-currency-line'></i>
                            <div >
                                <h3 className='font-bold text-xl'>₹193</h3>
                                <p className='text-gray-600 text-sm'>Cash cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='bg-green-600 text-white w-full p-2 font-semibold rounded'>Make a payment</button>
            </div>
        </div>
    )
}

export default Riding
