import React from 'react'
import { Phone } from 'lucide-react'; 

const Estimate = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a78] mb-4">
            Need A Free Estimate?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you want a roofing installation or replacement done or know someone
            who needs a roof repair and coating, get in touch with us today! Get
            the Best Roofing Services in Trivandrum from AJ Roofings.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-[#1e2a78] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2938a0] transition">
              GET A FREE ESTIMATE
            </button>

            <button className="bg-[#1e2a78]/90 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#2938a0] transition">
              <Phone size={18} /> CALL US NOW
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        {/* <div className="mt-10 md:mt-0 md:ml-10">
          <img
            src={}
            alt="Customer support illustration"
            className="max-w-sm w-full"
          />
        </div> */}
      </section>
  )
}

export default Estimate