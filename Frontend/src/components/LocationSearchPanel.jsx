import React from 'react'

const LocationSearchPanel = (props) => {
    // sample array for showing recently searched locations
    const locations = [
        "American Express, Bagmane Tech Park, Bangalore, 560045",
        "American Express, Bagmane Tech Park, Bangalore, 560045",
        "American Express, Bagmane Tech Park, Bangalore, 560045",
        "American Express, Bagmane Tech Park, Bangalore, 560045",
        "American Express, Bagmane Tech Park, Bangalore, 560045"
    ]

  return (
    <div>
      {/* this is for sample purpose*/}
      {
        locations.map((location, index) => (
            <div onClick={() => {
                props.setVehiclePanelOpen(true)
                props.setPanelOpen(false)
            }}  key={index} className ='flex gap-4 items-center justify-start my-2 border-2 p-3 border-gray-100 active:border-black rounded-xl'>
                <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
                <h4 className='font-medium'>{location}</h4>
            </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel
