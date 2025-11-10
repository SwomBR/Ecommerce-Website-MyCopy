import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    enquiryType: "",
    name: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend endpoint
      const response = await axios.post(
        "http://localhost:8000/addEnquiry",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Response:", response.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      setFormData({
        enquiryType: "",
        name: "",
        email: "",
        country: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error.response?.data || error);
      alert(error.response?.data?.message || "Error submitting enquiry");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-blue-200 to-blue-300 flex flex-col items-center p-5 mt-[70px]">

        {/* Floating design */}
        <div className="absolute top-[20%] left-[5%] w-20 h-20 bg-blue-300/20 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-20 h-20 bg-blue-300/20 rounded-full animate-[float_10s_ease-in-out_1s_infinite]"></div>

        <div className="container max-w-4xl w-full mt-10 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h1>

          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">

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
                  <a
                    href="https://www.durocaproofingindiapvt.co.in"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline break-words"
                  >
                    https://www.durocaproofingindiapvt.co.in
                  </a>
                </div>
              </div>
            </div>

             
            <div className="md:flex-1 p-6 md:p-8 bg-white relative">
              <form onSubmit={handleSubmit} className="space-y-4">

                 
                <div>
                  <label className="block font-medium mb-1 text-sm">Enquiry Type *</label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    required
                  >
                    <option value="">Select Enquiry Type</option>
                    <option value="Product Related">Product Related</option>
                    <option value="Service Related">Service Related</option>
                    <option value="Estimation">Estimation</option>
                  </select>
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
                  <label className="block font-medium mb-1 text-sm">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Your Country"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    required
                  />
                </div>

                 
                <div>
                  <label className="block font-medium mb-1 text-sm">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    pattern="[0-9]{7,15}"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 outline-none text-sm"
                    required
                  />
                </div>

                 
                <div>
                  <label className="block font-medium mb-1 text-sm">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your enquiry..."
                    minLength={50}
                    className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
                    required
                  />
                </div>

                 
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        enquiryType: "",
                        name: "",
                        email: "",
                        country: "",
                        phone: "",
                        message: "",
                      })
                    }
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
      </div>
      <Footer />
    </>
  );
};

export default Contact;
