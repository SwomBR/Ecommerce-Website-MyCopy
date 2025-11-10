import React from 'react';
import { Link } from 'react-router-dom';
import durocap from '../assets/durocap.jpg';
import image01 from '../assets/images01.png';

const About = () => {
  return (
    <section className="bg-white py-16 px-8 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">

         <div className="md:w-1/2 space-y-6 ml-[100px]">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            WHO WE ARE?<br />WHY WE ARE?
          </h2>

          <p className="text-gray-700 leading-relaxed ">
            Durocap Roofing Solutions - Strength Above All. <br />
            Protecting Every Structure with Lasting Strength and Trust. <br />
            Your Trusted Partner for Durable and Dependable Roofing. <br />
            Built Strong. Built Smart. Built by Durocap. <br />
            Raising Standards in Roofing, One Roof at a Time.
          </p>

          <Link
            to="/about"
            className="bg-[#1f5674] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#17465d] transition"
          >
            Know More ...
          </Link>
        </div>

         <div className="md:w-1/2 flex items-center justify-center relative">
           <div className="w-1/2 mr-[-30px] z-20">
            <img
              src={durocap}
              alt="Durocap Building"
              className="rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>

           <div className="w-1/2 z-10">
            <img
              src={image01}
              alt="Durocap Project"
              className="rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>

           <div className="absolute bg-white rounded-full shadow-lg flex flex-col items-center justify-center w-32 h-32 text-center -bottom-6 left-1/2 transform -translate-x-1/2 border border-gray-200 z-20">
            <h3 className="text-2xl font-bold text-gray-900">100+</h3>
            <p className="text-sm text-gray-600 leading-tight">
              SUCCESSFUL<br />PROJECTS
            </p>
            <a href="#" className="text-[#1f5674] text-xs mt-1 underline">See more →</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
