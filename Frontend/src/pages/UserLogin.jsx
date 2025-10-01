import React,{ useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState('');

  const { user, setUser } = useContext(UserDataContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { 
      email: email, 
      password: password 
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    console.log("Full response:", response);
    if(response.status === 201){
      const data = response.data;
      console.log("Login response:", data);
      setUser(data.user);
      navigate('/home');
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='email' required placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='password' required placeholder='password' />
          <button className='bg-[#111111] text-white font-bold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type='submit'>Login</button>
        </form>
        <p className='text-center'>New to Uber? <Link className='text-blue-600 font-semibold' to="/signup">Sign Up</Link></p>
      </div>
      <div className='mt-7'>
        <Link className='flex items-center justify-center bg-[#10b461] text-white font-bold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' to="/captain-login">Sign In as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
