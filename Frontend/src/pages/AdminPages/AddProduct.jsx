import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    prodId: "",
    categoryName: "",
    brand: "",
    dietaryType: "",
    material: "",
    shape: "",
    color: "",
    application: "",
    feature: "",
    pattern: "",
    origin: "",
    reqPurchaseQty: "",
    mrp: "",
    discountPercent: "",
    weight: "",
    stockQty: "",
  });

  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // token stored after  login

      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }
      if (productImage) form.append("productImage", productImage);

      const res = await axios.post("/api/products/addProducts", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "Product added successfully!");
      setFormData({
        productName: "",
        prodId: "",
        categoryName: "",
        brand: "",
        dietaryType: "",
        material: "",
        shape: "",
        color: "",
        application: "",
        feature: "",
        pattern: "",
        origin: "",
        reqPurchaseQty: "",
        mrp: "",
        discountPercent: "",
        weight: "",
        stockQty: "",
      });
      setProductImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Error adding product. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Add New Product
      </h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-gray-600 font-medium capitalize mb-1">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={["mrp", "discountPercent", "weight", "stockQty", "reqPurchaseQty"].includes(key) ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
              required={["productName", "prodId", "mrp", "stockQty"].includes(key)}
            />
          </div>
        ))}

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 w-auto rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
