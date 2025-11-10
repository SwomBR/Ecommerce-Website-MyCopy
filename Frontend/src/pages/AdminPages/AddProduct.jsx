import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";

const productDetailsFields = [
  ["Product Name", "productName", "text"],
  ["Product ID", "prodId", "text"],
  ["Category", "category", "select"],
  ["Application", "application", "text"],
  ["Usage", "usage", "text"],
  ["Model", "model", "text"],
];

const pricingStockFields = [
  ["Minimum Order Quantity", "moq", "number"],
  ["MRP", "mrp", "number"],
  ["Discount (%)", "discountPercent", "number"],
  ["Stock Quantity", "stockQty", "number"],
  ["Weight", "weight", "text"],
];

const specificationFields = [
  ["Material", "material"],
  ["Shape", "shape"],
  ["Color", "color"],
  ["Pattern", "pattern"],
  ["Origin", "origin"],
  ["Feature", "feature"],
  ["Size", "size"],
  ["Thickness", "thickness"],
  ["Batten Distance", "battenDistance"],
  ["Coverage", "coverage"],
  ["Breaking Strength", "breakStrength"],
  ["Water Absorbance", "waterAbsorb"],
  ["Quantity per Sq.ft", "qtyPerSqFt"],
  ["Type", "type"],
];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    prodId: "",
    category: "",
    material: "",
    shape: "",
    color: "",
    application: "",
    feature: "",
    pattern: "",
    origin: "",
    moq: "",
    mrp: "",
    discountPercent: "",
    weight: "",
    stockQty: "",
    size: "",
    thickness: "",
    battenDistance: "",
    coverage: "",
    breakStrength: "",
    description: "",
    waterAbsorb: "",
    model: "",
    usage: "",
    qtyPerSqFt: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/allCategories");
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

   const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

   const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setProductImages(updatedImages);
  };

   const handleRemoveImage = (index) => {
    const updated = [...productImages];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setProductImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      productImages.forEach((img) => formDataToSend.append("productImages", img.file));

      const token = localStorage.getItem("token");

      const res = await axios.post("/api/addProducts", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Product added successfully!");

       setFormData({
        productName: "",
        prodId: "",
        category: "",
        material: "",
        shape: "",
        color: "",
        application: "",
        feature: "",
        pattern: "",
        origin: "",
        moq: "",
        mrp: "",
        discountPercent: "",
        weight: "",
        stockQty: "",
        size: "",
        thickness: "",
        battenDistance: "",
        coverage: "",
        breakStrength: "",
        description: "",
        waterAbsorb: "",
        model: "",
        usage: "",
        qtyPerSqFt: "",
        type: "",
      });
      setProductImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Error adding product!");
    } finally {
      setLoading(false);
    }
  };

   const renderField = (label, name, type = "text") => (
    <div key={name} className="flex flex-col mb-4">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.catname}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type === "number" ? "number" : type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>
  );

  return (
    <>
      <AdminNavbar />
      <div className="max-w-5xl ml-[500px] py-6 px-4 bg-white min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productDetailsFields.map(([label, name, type]) => renderField(label, name, type))}
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Pricing & Stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pricingStockFields.map(([label, name, type]) => renderField(label, name, type))}
            </div>
          </section>

           <section className="mb-6">
            <label className="text-gray-700 font-medium mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specificationFields.map(([label, name]) => renderField(label, name))}
            </div>
          </section>

          <section className="mb-6">
            <label className="text-gray-700 font-medium mb-2 block">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {productImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                {productImages.map((img, index) => (
                  <div key={index} className="relative border rounded overflow-hidden">
                    <img src={img.preview} alt={`Preview ${index}`} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

           <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-8 rounded transition"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
