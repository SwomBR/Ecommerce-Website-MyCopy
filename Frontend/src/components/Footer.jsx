import React, { useEffect, useState } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function CollegeFooter() {
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 10 + Math.random() * 70, 
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: 2 + Math.random() * 3,
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
       <div className="absolute inset-0 opacity-30 pointer-events-none">
        {floatingElements.map((elem) => (
          <div
            key={elem.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${elem.left}%`,
              top: `${elem.top}%`,
              width: `${elem.size}px`,
              height: `${elem.size}px`,
              animation: `float ${elem.duration}s ease-in-out infinite`,
              animationDelay: `${elem.delay}s`,
            }}
          />
        ))}
      </div>

       <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-black font-bold text-lg">DC</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">DUROCAP ROOFING SOLUTION</h2>
                <p className="text-cyan-400 text-sm">Shaping the future</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A trusted roofing company committed to quality, durability, and innovation in roofing solutions since 2015.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Project Gallery', 'Services', 'Faq', 'Reviews'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-cyan-400 transition flex items-center gap-2 text-sm">
                    <ChevronRight size={16} /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

           <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Near IOC Gas Plant, Kolayil parippally.p.o, kollam, Kerala 691574</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">085938 52223</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@durocap.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Mon-Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-gray-700 hover:bg-cyan-400 rounded-full flex items-center justify-center transition">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

         <div className="border-t border-gray-700 pt-6 mt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; 2023 Durocap Roofing Solution All Rights Reserved. |{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a> |{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
          </p>
        </div>
      </div>

       <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.6;
          }
        }
      `}</style>
    </footer>
  );
}
