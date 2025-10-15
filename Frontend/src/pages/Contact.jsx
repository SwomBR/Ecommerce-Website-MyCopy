import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
    setFormData({ service: "", name: "", email: "", mobile: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-blue-200 to-blue-300 flex flex-col items-center p-5 mt-[70px]">

        {/* Floating elements */}
        <div className="absolute top-[20%] left-[5%] w-20 h-20 bg-blue-300/20 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-20 h-20 bg-blue-300/20 rounded-full animate-[float_10s_ease-in-out_1s_infinite]"></div>

        <div className="container max-w-4xl w-full mt-10 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h1>

          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">

            {/* Left Column — Company Info */}
            <div className="md:flex-1 p-6 md:p-8 bg-gradient-to-br from-blue-500 to-gray-800 text-white space-y-4 relative overflow-hidden">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <FaGlobe /> Durocap Roofing India Pvt. Ltd.
              </h2>

              <div className="flex items-center gap-2">
                <FaPhone className="text-yellow-300" />
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p>91 8593852225</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-300" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>contact@durocaproofingindiapvt.co.in</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-300" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>Near IOC gad plant, Kolayil, Paripally, Kollam, Kerala, India - 691574</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaGlobe className="text-yellow-300" />
                <div>
                  <h3 className="font-semibold">Website</h3>
                  <a href="https://www.durocaproofingindiapvt.co.in" target="_blank" rel="noreferrer" className="hover:underline break-words">
                    https://www.durocaproofingindiapvt.co.in
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column — Enquiry Form */}
            <div className="md:flex-1 p-6 md:p-8 bg-white relative">
              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <label className="block font-medium mb-1 text-sm">Product / Service Looking for *</label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Enter your requirement"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">Mobile *</label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-2 bg-gray-200 border border-gray-300 rounded-l-lg text-gray-700 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      pattern="[0-9]{10}"
                      className="flex-1 border border-gray-300 rounded-r-lg p-2 focus:ring focus:ring-blue-200 outline-none text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">Enquiry Details *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your enquiry..."
                    className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ service: "", name: "", email: "", mobile: "", message: "" })}
                    className="bg-gray-400 text-white px-3 py-1.5 rounded-lg hover:bg-gray-500 text-sm transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm transition"
                  >
                    Submit
                  </button>
                </div>

                {success && (
                  <div className="mt-3 p-3 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm animate-fadeIn">
                    <FaCheckCircle /> Your enquiry has been submitted successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        

        <style>{`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          .animate-[float_8s_ease-in-out_infinite] { animation: float 8s ease-in-out infinite; }
          .animate-[float_10s_ease-in-out_1s_infinite] { animation: float 10s ease-in-out 1s infinite; }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
