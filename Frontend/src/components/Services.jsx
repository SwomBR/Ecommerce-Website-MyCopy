import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Hammer, Droplets, Home, Ruler, Layers } from "lucide-react";

const services = [
  {
    icon: <Ruler className="w-10 h-10 text-blue-600 animate-pulse" />,
    title: "Roof Design and Visualization",
    description:
      "We create custom 3D roof designs to help you visualize your dream roof before installation begins.",
    aos: "flip-left",
    delay: "0",
  },
  {
    icon: <Layers className="w-10 h-10 text-blue-600 animate-pulse" />,
    title: "Roofing Material Supply",
    description:
      "We provide high-quality roofing materials including tiles, shingles, and sheets from trusted brands.",
    aos: "flip-right",
    delay: "150",
  },
  {
    icon: <Hammer className="w-10 h-10 text-blue-600 animate-pulse" />,
    title: "Roofing Installations",
    description:
      "Our expert team ensures safe, durable, and precise roof installation using modern techniques.",
    aos: "zoom-in",
    delay: "200",
  },
  {
    icon: <Home className="w-10 h-10 text-blue-600 animate-pulse" />,
    title: "Roof Maintenance",
    description:
      "We offer regular inspection, repair, and cleaning services to extend your roof’s lifespan.",
    aos: "zoom-in",
    delay: "250",
  },
  {
    icon: <Droplets className="w-10 h-10 text-blue-600 animate-pulse" />,
    title: "Rain Gutter Installation",
    description:
      "We install durable rain gutters to protect your building from water damage and foundation issues.",
    aos: "zoom-in",
    delay: "300",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-[#e0f7ff] to-[#f8fdff] text-center overflow-hidden" id="services">
      <h2
        data-aos="fade-down"
        className="text-4xl md:text-5xl font-bold text-[#0066cc] mb-6 animate-[floatTitle_4s_ease-in-out_infinite]"
      >
        Our <span className="text-blue-600">Services</span>
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-lg text-gray-600 mb-16"
      >
        High-quality roofing solutions to protect, enhance, and maintain your property.
      </p>

      <div className="grid gap-10 md:grid-cols-3 justify-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos={service.aos}
            data-aos-delay={service.delay}
            className="relative bg-white rounded-2xl p-10 text-center shadow-lg transform transition duration-400 hover:-translate-y-3 hover:rotate-x-1 hover:rotate-y-1 overflow-hidden w-full sm:w-[90%] md:w-[90%] lg:w-[85%]"
          >
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-blue-600/15 to-transparent rotate-[30deg] animate-[spin_8s_linear_infinite] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              {service.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="mt-2 text-gray-500 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes floatTitle {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default Services;
