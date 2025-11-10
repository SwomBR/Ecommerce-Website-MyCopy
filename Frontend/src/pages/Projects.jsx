import React, { useState } from "react";
import images01 from "../assets/images01.png";
import images02 from "../assets/images02.png";
import images03 from "../assets/images03.png";
import images04 from "../assets/images04.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      category: "residential",
      title: "Modern Villa Roofing",
      desc: "Elegant roofing for contemporary villas with premium materials.",
      img: images01,
    },
    {
      id: 2,
      category: "commercial",
      title: "Corporate Office Renovation",
      desc: "Commercial roofing designed for durability and sleek aesthetics.",
      img: images02,
    },
    {
      id: 3,
      category: "industrial",
      title: "Factory Roofing Upgrade",
      desc: "High-performance roofing solutions for industrial environments.",
      img: images03,
    },
    {
      id: 4,
      category: "residential",
      title: "Luxury Apartment Roofing",
      desc: "Stylish and weather-resistant roofing for modern apartments.",
      img: images04,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((item) => item.category === filter);

  const filters = [
    { label: "All", value: "all" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
    { label: "Industrial", value: "industrial" },
  ];

  return (
    <>
      <Navbar />
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto bg-gray-50 mt-[40px]">
        
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Our Projects
          </h1>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500"></div>
        </div>

        
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {filters.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-300 ${
                filter === btn.value
                  ? "bg-gradient-to-r from-red-500 to-blue-500 text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

         
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 aspect-square group"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/70 to-blue-600/70 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-5">
                <h3 className="text-xl font-bold mb-2 drop-shadow-md">
                  {project.title}
                </h3>
                <p className="text-sm mb-3">{project.desc}</p>
                <a
                  href="#"
                  className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
