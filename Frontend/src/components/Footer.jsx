import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b3a5b] text-white">
      {/* Top Contact Section */}
      <div className="grid md:grid-cols-3 gap-6 py-8 px-6 text-center md:text-left border-b border-gray-600">
        <div>
          <h3 className="text-lg font-semibold mb-2">📍 Location</h3>
          <p>Kollam, Kerala</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">📱 Mobile</h3>
          <a
            href="#"
            className="text-blue-300 hover:text-blue-400 underline transition"
          >
            View Mobile Number
          </a>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">📧 Email</h3>
          <a
            href="mailto:durocaproofings@gmail.com"
            className="text-blue-300 hover:text-blue-400 underline transition"
          >
            durocaproofings@gmail.com
          </a>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white text-center text-gray-800 py-10">
        <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
        <form className="flex justify-center items-center space-x-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-2/3 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

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
