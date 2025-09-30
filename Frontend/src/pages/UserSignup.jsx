import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ 
      username:{
        first: firstName,
        last: lastName
      },
      email: email, 
      password: password
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' type='text' required placeholder='First name' />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' type='text' required placeholder='Last name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='email' required placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='password' required placeholder='password' />
          <button className='bg-[#111111] text-white font-bold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type='submit'>Login</button>
        </form>
        <p className='text-center'>Already have an account? <Link className='text-blue-600 font-semibold' to="/login">Login</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span></p>
      </div>
    </div>
  )
}

export default UserSignup
