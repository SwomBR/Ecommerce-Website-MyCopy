import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b3a5b] text-white">
      
      {/* Bottom Navigation Links */}
      <div className="bg-[#0b3a5b] text-center py-4 border-t border-gray-700 text-sm">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <a href="#" className="hover:text-blue-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            About Us
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Products
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Testimonials
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Contact Us
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Site Map
          </a>
        </div>

        <div className="text-xs text-gray-300 mb-2">
          Ceramic Roofing Tiles | Clay Roofing Tiles | Clay Perforated Bricks |
          Limestone Cobbles | Natural Limestone Tiles | Asphalt Roofing Shingle
        </div>

        <p className="mt-3 text-gray-300 text-xs">
          © 2025 <span className="font-semibold">Durocap Roofing India Pvt. Ltd.</span>  
          | Developed & Managed by <span className="text-blue-300">Weblink.In Pvt. Ltd.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
