import React from "react";
import authImage from '../assets/authImage.png';

const HeroSection = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col bg-cover bg-center bg-no-repeat text-white animate-fadeIn"
      style={{
        backgroundImage: `url(${authImage})`,
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        .pacifico-regular {
          font-family: "Pacifico", cursive;
          font-weight: 400;
          font-style: normal;
        }`}
      </style>

      {/* Hero Content */}
      <div className="relative flex flex-col flex-1 px-6 mt-[100px] ml-[80px]">
        <h3 className="text-sm md:text-lg font-medium uppercase mb-3 ml-[240px] tracking-wide text-black">
          Roofing Services in Your City
        </h3>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-black pacifico-regular ml-[20px]">
          DuroCap Roofing Solutions
        </h1>
        <p className="max-w-2xl text-black font-extrabold text-center text-base md:text-lg mb-8 ml-[70px]">
          We are DuroCap — offering trusted, durable, and affordable roofing
          solutions for commercial and residential projects across the region.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 ml-[200px]">
          <button className="bg-blue-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-semibold transition">
            View Our Services
          </button>
          <button className="bg-blue-600 hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition">
            View Our Projects
          </button>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
