import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import r1 from "../assets/r1.jpg";
import r3 from "../assets/r3.png";
import r4 from "../assets/r4.jpg";
import r5 from "../assets/r5.jpeg";
import rs from "../assets/rs.jpeg";

const services = [
  {
    title: "Roof Design and Visualization",
    desc: "We bring your roofing ideas to life with advanced 3D design and visualization tools. Our design experts create accurate visual mockups to ensure material, color, and pattern harmony before installation.",
    img: r1,
  },
  {
    title: "Roofing Material Supply",
    desc: "We provide a wide range of roofing materials that combine strength, style, and sustainability. From metal sheets to weather-resistant tiles, every product is tested for performance.",
    img: r5,
  },
  {
    title: "Roofing Installations",
    desc: "Our professional installers ensure perfect alignment and sealing using modern techniques. We handle residential, commercial, and industrial roofing projects with long-lasting quality.",
    img: r3,
  },
  {
    title: "Roof Maintenance",
    desc: "We offer comprehensive maintenance including inspection, cleaning, and repair to extend your roof’s lifespan and prevent costly future issues.",
    img: r4,
  },
  {
    title: "Rain Gutter Installation",
    desc: "Our rain gutter systems provide efficient drainage, protecting your walls, foundation, and landscaping. We use seamless aluminum and PVC gutters built to last.",
    img: rs,
  },
];

const ServicePage = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 inline-block relative">
            Our Roofing Services
            <span className="absolute bottom-[-10px] left-1/4 w-1/2 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our range of professional roofing services designed to
            provide strength, protection, and beauty for your home or business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-700 opacity-0 translate-y-8 hover:-translate-y-3 hover:shadow-2xl`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
 
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-justify leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex justify-center mt-16">
          <Link
            to="/contact"
            className="bg-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
          >
            Contact Now
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ServicePage;
