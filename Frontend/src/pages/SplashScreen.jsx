import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css'

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
      navigate('/home');
    },2000);
  },[navigate]);

  return (
    <div className='box'>
      <div className='content'>
        <h1>DuroCap Roofing Solutions</h1>
        <h2>"Welcome to the perfect recipe hub for the enthusiast  </h2>
        <h2>— discover, cook, and savor every flavor."</h2>
      </div>
    </div>
  )
}

export default SplashScreen