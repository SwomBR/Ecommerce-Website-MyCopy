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
    <div
      className="flex flex-col items-center justify-center h-screen text-white animate-fadeIn bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/image1.png')",
      }}
    >

      <div className="relative text-center px-6 w-[900px] h-[120px] bg-white">
        <h1 className="text-8xl md:text-5xl font-extrabold text-blue-900 tracking-wide mb-4 animate-pulse">
          DuroCap Roofing Solutions
        </h1>
        <h2 className="text-2xl md:text-xl font-medium text-blue-700 italic opacity-90">
          “Building trust, one roof at a time — reliable, durable, and affordable.”
        </h2>
      </div>
    </div>
  );
};

export default SplashScreen;
