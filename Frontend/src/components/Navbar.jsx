import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav >
      <div className='logo'>
        <Link to='/home'>TastyBites</Link>
      </div>
      <div className='links'>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About us</Link>
        <Link to='/products'>Products</Link>
        <Link to='/contact'>Contact us</Link>
      </div>
    </nav>
  );
}

export default Navbar;