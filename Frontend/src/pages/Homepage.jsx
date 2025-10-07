import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    <>
    <Navbar />
    <section className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to DuroCap</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your one-stop solution for high-quality industrial products.
        </p>
      </section>
    <Footer />
    </>
    
  );
};

export default Homepage;
