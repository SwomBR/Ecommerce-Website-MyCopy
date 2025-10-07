import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white animate-fadeIn">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4 animate-pulse">
          DuroCap Roofing Solutions
        </h1>
        <h2 className="text-lg md:text-xl font-medium italic opacity-90">
          “Building trust, one roof at a time — reliable, durable, and affordable.”
        </h2>
      </div>
    </div>
  );
};

export default SplashScreen;
