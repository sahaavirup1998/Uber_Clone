import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 onClick={() => props.WaitingForDriver(false)} className='absolute w-[93%] p-1 text-center top-0'><i className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
      <div className='flex gap-2 justify-between items-center'>
        <img className='h-16' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' alt='uber car logo' />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>{props.ride?.captain?.name}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.vehicle?.plate}</h4>
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
      </div>
    </div>
  )
}

export default WaitingForDriver
