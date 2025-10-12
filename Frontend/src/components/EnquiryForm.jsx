import React, { useState } from "react";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    productService: "",
    name: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiry/addEnquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccessMsg("Enquiry submitted successfully!");
      setFormData({
        productService: "",
        name: "",
        email: "",
        country: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit an Enquiry</h2>

      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Product/Service</label>
          <input
            type="text"
            name="productService"
            value={formData.productService}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            minLength="2"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            pattern="[0-9]{7,15}"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Message (Min 5000 characters)</label>
          <textarea
            name="message"
            minLength="5000"
            value={formData.message}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded h-40"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
    
  );
};

export default EnquiryForm;
