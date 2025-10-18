// HeroSection.jsx
import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaPlay, FaTrophy } from "react-icons/fa";
import durocap from '../assets/durocap.jpg'
import { useNavigate, Link } from "react-router-dom";

const HeroSection = () => {
  const heroContentRef = useRef(null);
  const heroImageRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroContentRef.current) observer.observe(heroContentRef.current);
    if (heroImageRef.current) observer.observe(heroImageRef.current);

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      circlesRef.current.forEach((circle, index) => {
        const speed = index + 1;
        if (circle)
          circle.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-gradient-to-br from-[#2c3e50] to-[#2980b9]">
      {/* Floating Circles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[0, 1, 2].map((_, i) => (
          <div
            key={i}
            ref={(el) => (circlesRef.current[i] = el)}
            className={`absolute rounded-full bg-gradient-radial from-[#3498db] to-transparent opacity-10 blur-xl animate-float`}
            style={{
              width: i === 0 ? "400px" : i === 1 ? "600px" : "300px",
              height: i === 0 ? "400px" : i === 1 ? "600px" : "300px",
              top: i === 0 ? "20%" : i === 2 ? "60%" : "auto",
              left: i === 0 ? "10%" : i === 2 ? "50%" : "auto",
              bottom: i === 1 ? "-100px" : "auto",
              right: i === 1 ? "-100px" : "auto",
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content & Image */}
      <div className="container mx-auto px-10 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ml-[80px]">
        {/* Hero Text */}
        <div ref={heroContentRef} className="relative opacity-0">
          <span className="inline-block text-blue-500 font-semibold text-sm tracking-wider uppercase mb-5 relative pl-14 ml-[50px]">
            Premium Roofing Services in Kerala
            <span className="absolute left-0 top-1/2 w-10 h-[2px] bg-blue-500 -translate-y-1/2" />
          </span>

          {/* DuroCap heading with Pacifico font */}
          <h1 className="text-8xl text-white leading-tight relative pacifico-font ml-[100px]">
            DuroCap 
          </h1>

          <h2 className="text-5xl font-bold text-white mb-6 leading-tight relative ml-[100px]">
            Roofing Solutions
          </h2>

          <p className="text-white/90 text-lg lg:text-xl max-w-xl mb-10 ml-[50px]">
            We are DuroCap — offering trusted, durable, and affordable roofing
            solutions for commercial and residential projects across Kerala.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-blue-500 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              About us <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold border-2 border-white text-white hover:bg-white/10 hover:-translate-y-1 transition-all"
            >
              Our Services <FaPlay className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div ref={heroImageRef} className="relative opacity-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform perspective-[1000px] rotate-y-[-15deg] hover:rotate-y-0 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-transparent z-10" />
            <img
              src={durocap}
              alt="Digital Solution"
              className="w-full h-auto transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-7 -right-7 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-2xl animate-pulse">
            <FaTrophy className="text-3xl" />
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
          .pacifico-font {
            font-family: 'Pacifico', cursive;
          }

          @keyframes float {
            0% { transform: translate(0,0) rotate(0deg);}
            33% { transform: translate(30px,-30px) rotate(5deg);}
            66% { transform: translate(-30px,20px) rotate(-5deg);}
            100% { transform: translate(0,0) rotate(0deg);}
          }
          .animate-float {
            animation: float 15s infinite ease-in-out;
          }

          @keyframes fadeInUp {
            from { opacity:0; transform: translateY(50px);}
            to { opacity:1; transform: translateY(0);}
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
