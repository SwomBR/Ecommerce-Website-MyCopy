import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="brand-name">DuroCap Roofing Solutions</h1>
        <h2 className="tagline">
          "Building trust, one roof at a time — reliable, durable, and affordable."
        </h2>
      </div>
    </div>
  );
};

export default SplashScreen;
