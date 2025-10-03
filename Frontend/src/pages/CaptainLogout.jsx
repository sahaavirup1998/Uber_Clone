import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    if (response.status === 200 || response.status === 201) {
      localStorage.removeItem('token');
      navigate('/captain-login');
    }
  })
  .catch(error => {
    console.error("Error logging out:", error);
  });

  return (
    <div>
        <h1>Goodbye!</h1>
        <p>You have been logged out successfully.</p>
    </div>
  )
}

export default CaptainLogout
