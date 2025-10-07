import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';  

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/home" className="flex items-center space-x-2 ml-4">
          <img
            src={logo}
            alt="DuroCap Logo"
            className="w-[250px] h-[70px] object-contain"
          />
        </Link>
      </div>

      <div className="flex space-x-6">
        <Link
          to="/home"
          className="text-black hover:text-[#00b4d8] text-xl transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-black hover:text-[#00b4d8] text-xl transition duration-300"
        >
          About Us
        </Link>
        <Link
          to="/products"
          className="text-black hover:text-[#00b4d8] text-xl transition duration-300"
        >
          Products
        </Link>
        <Link
          to="/contact"
          className="text-black hover:text-[#00b4d8] text-xl transition duration-300 mr-4"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
