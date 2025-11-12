import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Hammer, Droplets, Home, Ruler, Layers } from "lucide-react";

const services = [
  {
    icon: <Ruler className="w-10 h-10 text-blue-600" />,
    title: "Roof Design and Visualization",
    description:
      "We create custom 3D roof designs to help you visualize your dream roof before installation begins.",
  },
  {
    icon: <Layers className="w-10 h-10 text-blue-600" />,
    title: "Roofing Material Supply",
    description:
      "We provide high-quality roofing materials including tiles, shingles, and sheets from trusted brands.",
  },
  {
    icon: <Hammer className="w-10 h-10 text-blue-600" />,
    title: "Roofing Installations",
    description:
      "Our expert team ensures safe, durable, and precise roof installation using modern techniques.",
  },
  {
    icon: <Home className="w-10 h-10 text-blue-600" />,
    title: "Roof Maintenance",
    description:
      "We offer regular inspection, repair, and cleaning services to extend your roof's lifespan.",
  },
  {
    icon: <Droplets className="w-10 h-10 text-blue-600" />,
    title: "Rain Gutter Installation",
    description:
      "We install durable rain gutters to protect your building from water damage and foundation issues.",
  },
  {
    icon: <Hammer className="w-10 h-10 text-blue-600" />,
    title: "Roof Leak Repairs",
    description:
      "Quick and efficient leak detection and repair to prevent long-term roof damage.",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-20 bg-gray-100 text-center" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2
          data-aos="fade-up"
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Our <span className="text-blue-600">Services</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto"
        >
          We offer professional roofing solutions that ensure long-lasting
          protection and enhance your property's value.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center border border-gray-100"
            >
              <div className="bg-blue-50 p-5 rounded-full mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
