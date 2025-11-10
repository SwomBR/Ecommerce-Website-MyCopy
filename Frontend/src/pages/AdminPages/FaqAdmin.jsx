import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaChevronDown, FaPlus } from "react-icons/fa";
import AdminNavbar from "../../components/AdminNavbar";

const API_URL = "/api";  

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [newFaq, setNewFaq] = useState({
    slnumber: "",
    question: "",
    category: "",
    answers: "",
  });

  
  const fetchFAQs = async () => {
    try {
      const res = await axios.get(`${API_URL}/getAllFAQ`);
      setFaqs(res.data);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    }
  };

 
  const addFAQ = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/addFAQ`, newFaq);
      setNewFaq({ slnumber: "", question: "", category: "", answers: "" });
      fetchFAQs();
    } catch (err) {
      console.error("Error adding FAQ:", err);
    }
  };

   
  const deleteFAQ = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteFAQ/${id}`);
      fetchFAQs();
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

 
  const toggleFAQ = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <>
    <AdminNavbar/>
    <section className="max-w-5xl mx-auto px-6 py-10 ml-[400px]">
       <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Add, view, and manage frequently asked questions below.
        </p>
      </div>

       <form
        onSubmit={addFAQ}
        className="bg-white rounded-lg shadow p-6 mb-8 space-y-4"
      >
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FaPlus className="text-blue-600" /> Add New FAQ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Serial Number"
            className="border p-2 rounded"
            value={newFaq.slnumber}
            onChange={(e) =>
              setNewFaq({ ...newFaq, slnumber: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-2 rounded"
            value={newFaq.category}
            onChange={(e) =>
              setNewFaq({ ...newFaq, category: e.target.value })
            }
            required
          />
        </div>

        <input
          type="text"
          placeholder="Question"
          className="border p-2 rounded w-full"
          value={newFaq.question}
          onChange={(e) =>
            setNewFaq({ ...newFaq, question: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Answer"
          className="border p-2 rounded w-full"
          value={newFaq.answers}
          onChange={(e) =>
            setNewFaq({ ...newFaq, answers: e.target.value })
          }
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Add FAQ
        </button>
      </form>

      
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <p className="text-gray-500 text-center">No FAQs found.</p>
        ) : (
          faqs.map((faq, idx) => (
            <div
              key={faq._id}
              className={`border rounded-lg p-4 transition-all ${
                activeIndex === idx
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(idx)}
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {faq.slnumber}. {faq.question}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold text-gray-700">Category:</span>{" "}
                    {faq.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFAQ(faq._id);
                    }}
                  />
                  <FaChevronDown
                    className={`text-gray-500 transform transition-transform duration-300 ${
                      activeIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {activeIndex === idx && (
                <p className="mt-3 text-gray-700 border-t pt-3">{faq.answers}</p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
    </>
  );
};

export default FaqAdmin;
