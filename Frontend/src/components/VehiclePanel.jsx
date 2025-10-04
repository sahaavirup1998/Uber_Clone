import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={() => props.setVehiclePanelOpen(false)} className='absolute w-[93%] p-1 text-center top-0'><i className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i></h5>
        <h3 className='font-semibold text-2xl mb-3'>Choose a ride</h3>
        <div onClick={() => props.setConfirmRidePanel(true)} className='w-full border-2 active:border-black rounded-xl flex items-center justify-between p-3 mb-2'>
          <img className='h-12' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' alt='uber car logo' />
          <div className=' w-1/2'>
            <h4 className='font-medium text-lg'>UberGo<span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-base'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='font-semibold text-lg'>₹193.23</h2>
        </div>
        <div onClick={() => props.setConfirmRidePanel(true)} className='w-full border-2 active:border-black rounded-xl flex items-center justify-between p-3 mb-2'>
          <img className='h-12' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n' alt='uber bike logo' />
          <div className=' w-1/2'>
            <h4 className='font-medium text-lg'>Moto<span><i className='ri-user-3-fill'></i>1</span></h4>
            <h5 className='font-medium text-base'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
          </div>
          <h2 className='font-semibold text-lg'>65.30</h2>
        </div>
        <div onClick={() => props.setConfirmRidePanel(true)} className='w-full border-2 active:border-black rounded-xl flex items-center justify-between p-3 mb-2'>
          <img className='h-12' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n' alt='uber car logo' />
          <div className=' w-1/2'>
            <h4 className='font-medium text-lg'>UberAuto<span><i className='ri-user-3-fill'></i>3</span></h4>
            <h5 className='font-medium text-base'>5 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
          </div>
          <h2 className='font-semibold text-lg'>₹101.78</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
