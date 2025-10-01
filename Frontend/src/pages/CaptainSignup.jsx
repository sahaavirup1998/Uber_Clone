import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if(response.status === 201 || response.status === 200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-4' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="Uber Logo" />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className="flex gap-4 mb-4">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm' type='text' required placeholder='First name' />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm' type='text' required placeholder='Last name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-base placeholder:text-sm' type='email' required placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-base placeholder:text-sm' type='password' required placeholder='password' />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-5'>
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm' type="text" placeholder='Vehicle Color' value={vehicleColor} onChange={(e) => {setVehicleColor(e.target.value)}} />
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm' type="text" placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e) => {setVehiclePlate(e.target.value)}} />
          </div>
          <div className='flex gap-4 mb-5'>
            <input required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm' type="number" placeholder='Vehicle Capacity' value={vehicleCapacity} onChange={(e) => {setVehicleCapacity(e.target.value)}} />
            <select required className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-sm' value={vehicleType} onChange={(e) => {setVehicleType(e.target.value)}} >
              <option value="" disabled className='text-sm'>Select Vehicle Type</option>
              <option value="car" className='text-sm'>Car</option>
              <option value="auto" className='text-sm'>Auto</option>
              <option value="moto" className='text-sm'>Moto</option>
            </select>
          </div>
          <button className='bg-[#111111] text-white font-bold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type='submit'>Create Captain Account</button>
        </form>
        <p className='text-center'>Already have an account? <Link className='text-blue-600 font-semibold' to="/captain-login">Login</Link></p>
      </div>
      <div className='mt-5 mb-3'>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span></p>
      </div>
    </div>
  )
}

export default CaptainSignup
