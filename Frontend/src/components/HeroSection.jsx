import React from "react";
import { motion } from "framer-motion"; // 👈 Import Framer Motion
import HeroImage from "../assets/HeroImage.jpg";
import MainLogo from "../assets/MainLogo.png";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen min-h-[800px]">
      {/* Left Content */}
      <div className="flex flex-col justify-center items-start bg-[#1f5674] h-[800px] text-white px-10 md:px-20 lg:px-28 w-full md:w-1/2 overflow-hidden">
        
        {/* Animated text */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}      // starts slightly below and transparent
          animate={{ opacity: 1, y: 0 }}       // fades in and slides up
          transition={{ duration: 1.2, ease: "easeOut" }} // smooth timing
          className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-serif font-light mb-6"
        >
          We are{" "}
          <span className="font-semibold text-[#58c6d3]">DuroCap</span> — offering trusted, durable, 
          and affordable roofing solutions for commercial and residential projects across Kerala.
        </motion.h2>

        {/* Animated buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4"
        >
          <button className="bg-[#58c6d3] text-white font-medium px-6 py-3 rounded-md hover:bg-[#4cb2bd] transition">
            ABOUT US
          </button>
          <button className="border border-white text-white font-medium px-6 py-3 rounded-md hover:bg-white hover:text-[#1f5674] transition">
            OUR SERVICES
          </button>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full md:w-1/2 h-[800px] bg-gradient-to-t from-[#ffffff] to-[#eaf6ff]">
        <img
          src={HeroImage}
          alt="DuroCap Hero Section"
          className="h-full w-full object-cover"
        />

        <motion.img
          src={MainLogo}
          alt="DuroCap Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 m-auto w-[500px] h-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;
