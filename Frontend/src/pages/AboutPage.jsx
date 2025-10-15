import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import images01 from "../assets/images01.png";
import images02 from "../assets/images02.png";
import images03 from "../assets/images03.png";
import images09 from "../assets/images09.png";

const AboutPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".fade-section").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
      observer.observe(el);
    });
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white py-16 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-10">
          
          {/* Left Section - About Text */}
          <div className="md:w-1/2 fade-section">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">
              Welcome to Durocap Roofing India Pvt. Ltd.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Durocap Roofing India Pvt. Ltd. stands as a trusted name in
              premium roofing solutions. Our journey began with a vision to
              deliver excellence and innovation across every project, ensuring
              durability, safety, and unmatched design standards.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We specialize in crafting high-quality roofing products that
              cater to commercial, residential, and industrial applications.
              Every Durocap tile embodies superior craftsmanship, durability,
              and protection.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our interlocking roof tiles combine innovation with strength,
              providing an elegant look while maintaining resistance to harsh
              weather and time. With anti-fungal properties and long-lasting
              finishes, we redefine what roofs can achieve.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Durocap, we believe that a roof should do more than just
              protect—it should inspire confidence and style for generations to
              come.
            </p>
            
          </div>

          {/* Right Section - Image Gallery */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4 fade-section">
            <img
              src={images01}
              alt="Roof installation"
              className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg hover:scale-105 hover:-translate-y-2 transition-transform duration-500"
            />
            <img
              src={images02}
              alt="Roof tiles"
              className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg hover:scale-105 hover:-translate-y-2 transition-transform duration-500"
            />
            <img
              src={images03}
              alt="Modern roofing"
              className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg hover:scale-105 hover:-translate-y-2 transition-transform duration-500"
            />
            <img
              src={images09}
              alt="Roof design"
              className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg hover:scale-105 hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
