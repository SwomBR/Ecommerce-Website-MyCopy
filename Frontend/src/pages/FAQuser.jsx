import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

const FAQuser = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const API_URL = "/api/getAllFAQ";  

 
  const fetchFAQs = async () => {
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      setFaqs(res.data);
    } catch (err) {
      console.error("❌ Error fetching FAQs:", err);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

   const groupedFAQs = faqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(faq);
    return acc;
  }, {});

  const toggleFAQ = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
       <header className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-2">
          Find answers to common questions about buying, selling, and renting
          properties.
        </p>
      </header>

       {Object.keys(groupedFAQs).length === 0 ? (
        <p className="text-gray-500 text-center">No FAQs found.</p>
      ) : (
        Object.entries(groupedFAQs).map(([category, categoryFAQs], catIdx) => (
          <div key={catIdx} className="mb-10">
             <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg mb-5 shadow-md">
              <h3 className="text-xl font-semibold tracking-wide uppercase">
                {category}
              </h3>
            </div>

             <div className="space-y-4">
              {categoryFAQs.map((faq, idx) => {
                const uniqueIndex = `${catIdx}-${idx}`;
                return (
                  <div
                    key={faq._id || uniqueIndex}
                    className={`border rounded-xl shadow-sm p-5 transition-all duration-300 ${
                      activeIndex === uniqueIndex
                        ? "bg-blue-50 border-blue-300"
                        : "bg-white border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <button
                      className="flex justify-between w-full items-center text-left"
                      onClick={() => toggleFAQ(uniqueIndex)}
                    >
                      <h4 className="font-medium text-gray-800 flex items-center gap-2">
                        <span className="text-blue-600 font-bold">
                          {faq.slnumber}.
                        </span>{" "}
                        {faq.question}
                      </h4>
                      <FaChevronDown
                        className={`text-gray-500 transform transition-transform duration-300 ${
                          activeIndex === uniqueIndex ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeIndex === uniqueIndex && (
                      <p className="mt-3 text-gray-700 leading-relaxed">
                        {faq.answers}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

       <div className="mt-12 text-center bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Still Have Questions?
        </h3>
        <p className="text-gray-600 mb-5">
          Our real estate experts are here to help you with any questions about
          buying, selling, or renting properties.
        </p>
        <a
          href="#contact"
          className="inline-block bg-red-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-red-700 transition"
        >
          Contact Our Team
        </a>
      </div>
    </section>
  );
};

export default FAQuser;
