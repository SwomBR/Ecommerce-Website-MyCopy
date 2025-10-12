import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [productImages, setProductImages] = useState([]); // store {file, preview}
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/allCategories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Handle form field change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🔹 Handle multiple image selection
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Add new images (but not more than 5 total)
    const totalFiles = [...productImages, ...newFiles.slice(0, 5 - productImages.length)];

    // Map with previews
    const updatedImages = totalFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setProductImages(updatedImages);
  };

  // 🔹 Remove selected image
  const handleRemoveImage = (index) => {
    const updated = [...productImages];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setProductImages(updated);
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (productImages.length === 0) {
      setMessage("Please upload at least one product image.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();

      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      productImages.forEach(({ file }) => form.append("productImages", file));

      const res = await axios.post("/api/addProducts", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "Product added successfully!");

      // Reset form + previews
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
      productImages.forEach((img) => URL.revokeObjectURL(img.preview));
      setProductImages([]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error adding product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cleanup on unmount
  useEffect(() => {
    return () => {
      productImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [productImages]);

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
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
        {/* Category Dropdown */}
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.catname}
              </option>
            ))}
          </select>
        </div>

        {/* Input fields */}
        {Object.keys(formData)
          .filter((key) => key !== "category")
          .map((key) => (
            <div key={key}>
              <label className="block text-gray-600 font-medium capitalize mb-1">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={
                  ["mrp", "discountPercent", "weight", "stockQty", "moq", "qtyPerSqFt"].includes(
                    key
                  )
                    ? "number"
                    : "text"
                }
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                required={["productName", "prodId", "mrp", "stockQty"].includes(key)}
              />
            </div>
          ))}

        {/* Image Upload Field */}
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-2">
            Product Images (max 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          />

          {/* Preview Section */}
          {productImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-3">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden shadow-md group"
                >
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition duration-200"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
