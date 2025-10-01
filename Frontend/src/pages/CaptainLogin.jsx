import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captain = { 
      email: email, 
      password: password 
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    if(response.status === 201 || response.status === 200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
          <div>
            <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="Uber Logo" />
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='email' required placeholder='email@example.com' />
              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='password' required placeholder='password' />
              <button className='bg-[#111111] text-white font-bold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type='submit'>Login</button>
            </form>
            <p className='text-center'>Join a fleet? <Link className='text-blue-600 font-semibold' to="/captain-signup">Register as Captain</Link></p>
          </div>
          <div className='mt-7'>
            <Link className='flex items-center justify-center bg-[#d5622d] text-white font-bold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' to="/login">Sign In as User</Link>
          </div>
        </div>
  )
}

export default CaptainLogin
