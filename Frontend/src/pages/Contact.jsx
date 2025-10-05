import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Your enquiry has been submitted successfully!");
    setFormData({
      service: "",
      name: "",
      email: "",
      mobile: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">
        {/* Left Column — Company Info */}
        <div className="space-y-5">
          <h2 className="text-xl font-semibold text-blue-700">
            Durocap Roofing India Pvt. Ltd.
          </h2>

          <div>
            <h3 className="text-gray-800 font-medium mb-1">Contact Person</h3>
            <p className="text-gray-600">Mr. Rajesh Sivadasan</p>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-1">Address</h3>
            <p className="text-gray-600">
              Near IOC gad plant, Kolayil, Paripally, Kollam, Kerala, India - 691574
            </p>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-1">Call Us</h3>
            <a
              href="tel:+91XXXXXXXXXX"
              className="text-blue-600 hover:underline"
            >
              View Mobile Number
            </a>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-1">Web Address</h3>
            <a
              href="https://www.durocaproofingindiapvt.co.in"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-words"
            >
              https://www.durocaproofingindiapvt.co.in
            </a>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-1">Web Pages</h3>
            <ul className="text-blue-600 space-y-1">
              <li>
                <a
                  href="https://www.exportersindia.com/durocap-roofing-india/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  ExportersIndia Profile
                </a>
              </li>
              <li>
                <a
                  href="https://www.indianyellowpages.com/kollam/durocap-roofing-india-pvt-ltd-4149971/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  IndiaYellowPages Listing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-1">
              Take the 360° Google Virtual Tour
            </h3>
            <a
              href="https://goo.gl/maps/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Large 360° View on Google
            </a>
          </div>
        </div>

        {/* Right Column — Enquiry Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-xl shadow-inner"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product / Service Looking for *
            </label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Enter your requirement"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Mobile *
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 bg-gray-200 border border-gray-300 rounded-l-lg text-gray-700">
                +91
              </span>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                className="flex-1 border border-gray-300 rounded-r-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Enquiry Details *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your enquiry..."
              className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  service: "",
                  name: "",
                  email: "",
                  mobile: "",
                  message: "",
                })
              }
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
