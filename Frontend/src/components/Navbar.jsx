import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';  

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/home" className="flex items-center space-x-2 ml-[200px] ">
          <img
            src={logo}
            alt="DuroCap Logo"
            className="w-[250px] h-[70px] object-contain"
          />
        </Link>
      </div>

      <div className="flex space-x-4">
        <Link
          to="/home"
          className="text-black hover:text-[#00b4d8] text-lg transition duration-300"
        >
          HOME
        </Link>
        <Link
          to="/about"
          className="text-black hover:text-[#00b4d8] text-lg transition duration-300"
        >
          ABOUT US
        </Link>
        <Link
          to="/products"
          className="text-black hover:text-[#00b4d8] text-lg transition duration-300"
        >
          PRODUCTS
        </Link>
        <Link
          to="/services"
          className="text-black hover:text-[#00b4d8] text-lg transition duration-300"
        >
          SERVICES
        </Link>
        <Link
          to="/projects"
          className="text-black hover:text-[#00b4d8] text-lg transition duration-300"
        >
          PROJECTS
        </Link>
        <Link
          to="/contact"
          className="text-black hover:text-[#00b4d8] text-lg transition duration-300 mr-[100px]"
        >
          CONTACT US
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
