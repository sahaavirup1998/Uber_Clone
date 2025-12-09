import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5 onClick={() => props.setLookingForDriverPanel(false)} className='absolute w-[93%] p-1 text-center top-0'><i className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
      <h3 className='font-semibold text-2xl mb-3'>Looking for Driver</h3>
      <div className='flex gap-2 justify-between items-center flex-col'>
        <img className='h-20' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' alt='uber car logo' />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 border-b-2 p-3'>
            <i className='text-2xl ri-map-pin-2-fill'></i>
            <div >
              <h3 className='font-bold text-xl'>Pickup</h3>
              <p className='text-gray-600 text-sm'>{props.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 border-b-2 p-3'>
            <i className='text-2xl ri-map-pin-user-fill'></i>
            <div >
              <h3 className='font-bold text-xl'>Destination</h3>
              <p className='text-gray-600 text-sm'>{props.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className='text-2xl ri-currency-line'></i>
            <div >
              <h3 className='font-bold text-xl'>₹{props.fare[props.vehicleType]??"150"}</h3>
              <p className='text-gray-600 text-sm'>Cash cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver