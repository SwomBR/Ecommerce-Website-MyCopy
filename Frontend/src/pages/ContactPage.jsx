import React, { useState } from "react";
import { FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaChild, FaGraduationCap, FaStar, FaComment, FaCheckCircle } from "react-icons/fa";

const ContactPage = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [success, setSuccess] = useState(false);

  const grades = [
    { label: "Preschool", value: "preschool" },
    { label: "Elementary", value: "elementary" },
    { label: "Middle School", value: "middle" },
    { label: "High School", value: "high" },
  ];

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
    e.target.reset();
    setSelectedGrade("");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-blue-200 to-blue-300 flex flex-col items-center p-5">
      
      {/* Back Button */}
      <a href="#" className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition-all">
        <FaArrowLeft /> Back to School
      </a>

      {/* Floating elements */}
      <div className="absolute top-[20%] left-[5%] w-24 h-24 bg-blue-300/20 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[10%] right-[5%] w-24 h-24 bg-blue-300/20 rounded-full animate-[float_10s_ease-in-out_1s_infinite]"></div>

      {/* Pencils */}
      <FaGraduationCap className="absolute top-[15%] left-[8%] text-blue-500 opacity-70 animate-[write_10s_ease_infinite]" size={40}/>
      <FaGraduationCap className="absolute bottom-[15%] right-[8%] text-blue-500 opacity-70 animate-[write_12s_ease_infinite_reverse]" size={40}/>

      <div className="container max-w-6xl w-full mt-10 animate-fadeIn">

        {/* Header */}
        <header className="text-center mb-10 relative">
          <h1 className="text-5xl font-bold text-gray-800 font-montserrat">
            Bright Future <span className="text-blue-500">Academy</span>
          </h1>

          <div className="flex justify-center flex-wrap gap-5 mt-5">
            {["book", "graduation-cap", "pencil-alt", "calculator", "microscope", "laptop"].map((icon, idx) => (
              <div key={idx} className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg hover:bg-gray-800 transition-all">
                <i className={`fas fa-${icon}`}></i>
              </div>
            ))}
          </div>
        </header>

        {/* Form Container */}
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-2xl">
          
          {/* Info Panel */}
          <div className="md:flex-1 bg-gradient-to-br from-blue-500 to-gray-800 text-white p-12 flex flex-col justify-center relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-5">Education for Tomorrow's Leaders</h2>
            <p className="mb-8 text-lg leading-relaxed">
              Our dedicated staff is here to answer your questions about our curriculum, extracurricular activities, and the enrollment process. We believe in nurturing each child's unique potential.
            </p>

            <ul className="space-y-6">
              <li className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="bg-white text-blue-500 w-14 h-14 flex items-center justify-center rounded-full"><FaPhone /></div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p>(555) 123-4567</p>
                </div>
              </li>
              <li className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="bg-white text-blue-500 w-14 h-14 flex items-center justify-center rounded-full"><FaEnvelope /></div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p>admissions@brightfuture.edu</p>
                </div>
              </li>
              <li className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="bg-white text-blue-500 w-14 h-14 flex items-center justify-center rounded-full"><FaMapMarkerAlt /></div>
                <div>
                  <h3 className="font-semibold">Visit Our Campus</h3>
                  <p>123 Education Lane<br/>Springfield, IL 62701</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Panel */}
          <div className="md:flex-1 p-12 bg-white relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Parent/Guardian Name */}
              <div>
                <label className="flex items-center gap-2"><FaUser /> Parent/Guardian Name *</label>
                <input type="text" placeholder="Full name" required className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2"><FaEnvelope /> Email Address *</label>
                <input type="email" placeholder="Your email address" required className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2"><FaPhone /> Phone Number *</label>
                <input type="tel" placeholder="Your phone number" required className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
              </div>

              {/* Student Name */}
              <div>
                <label className="flex items-center gap-2"><FaChild /> Student Name *</label>
                <input type="text" placeholder="Student's full name" required className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
              </div>

              {/* Grade Level */}
              <div>
                <label className="flex items-center gap-2"><FaGraduationCap /> Grade Level *</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {grades.map((g) => (
                    <div
                      key={g.value}
                      className={`p-3 rounded-lg border cursor-pointer ${selectedGrade === g.value ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 border-gray-300"}`}
                      onClick={() => handleGradeClick(g.value)}
                    >
                      {g.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Interest */}
              <div>
                <label className="flex items-center gap-2"><FaStar /> Program of Interest</label>
                <select className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                  <option value="">Select a program</option>
                  <option value="stem">STEM Program</option>
                  <option value="arts">Arts & Music</option>
                  <option value="sports">Athletics</option>
                  <option value="ib">International Baccalaureate</option>
                  <option value="ap">Advanced Placement</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2"><FaComment /> Questions & Comments</label>
                <textarea placeholder="Tell us about your child and any specific questions you have" className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"></textarea>
              </div>

              <button type="submit" className="w-full p-4 font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-gray-800 text-white hover:from-gray-800 hover:to-blue-500 transition-all transform hover:-translate-y-1 shadow-lg">
                Request Information
              </button>

              {/* Success Message */}
              {success && (
                <div className="mt-5 p-4 bg-green-600 text-white rounded-lg flex items-center gap-2 animate-fadeIn">
                  <FaCheckCircle /> Thank you for your inquiry! Our admissions team will contact you shortly.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-gray-600 text-sm">
          © 2023 Bright Future Academy. All rights reserved. | Preparing students for a bright future
        </footer>
      </div>

      {/* Tailwind animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes write {
          0%,100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(20px) translateY(10px) rotate(5deg); }
          50% { transform: translateX(-10px) translateY(20px) rotate(-5deg); }
          75% { transform: translateX(10px) translateY(-10px) rotate(3deg); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-[float_8s_ease-in-out_infinite] { animation: float 8s ease-in-out infinite; }
        .animate-[float_10s_ease-in-out_1s_infinite] { animation: float 10s ease-in-out 1s infinite; }
        .animate-[write_10s_ease_infinite] { animation: write 10s ease infinite; }
        .animate-[write_12s_ease_infinite_reverse] { animation: write 12s ease infinite reverse; }
      `}</style>
    </div>
  );
};

export default ContactPage;
