import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200 || response.status === 201){
            localStorage.removeItem('token');
            navigate('/login');
        }
    }).catch((error) => {
        console.error('Error during logout:', error);
    })
    

    return (
        <div>
            <h1>Goodbye!</h1>
            <p>You have been logged out successfully.</p>
        </div>
    )
}

export default UserLogout
