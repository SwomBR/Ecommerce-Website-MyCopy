import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import StatsBanner from '../components/StatsBanner';
import Services from '../components/Services';
import CategorySection from '../components/CategorySection';
import Estimate from '../components/Estimate';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <CategorySection />
      <Services />
      <Estimate />
      <StatsBanner />
      <Footer />
    </>
  );
};

export default Homepage;
