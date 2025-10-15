import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import CategorySection from '../components/CategorySection';
import Estimate from '../components/Estimate';
import About from '../components/About';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Services />
      <CategorySection />
      
      <Estimate />
      <Footer />
    </>
  );
};

export default Homepage;
