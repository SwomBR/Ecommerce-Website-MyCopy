import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch product and categories
  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const catRes = await axios.get("http://localhost:8000/allCategories");
        setCategories(catRes.data);

        const prodRes = await axios.get(`http://localhost:8000/viewproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = prodRes.data;

        setProduct({
          ...data,
          category: data.category?._id || "",
        });

        const existingImgs = (data.productImages || []).map((src) => ({
          src,
          isNew: false,
        }));
        setImages(existingImgs);
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage("❌ Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndCategories();
  }, [id]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed!");
      return;
    }
    const newImgs = files.map((file) => ({
      src: URL.createObjectURL(file),
      isNew: true,
      file,
    }));
    setImages([...images, ...newImgs]);
  };

  const handleRemoveImage = (index) => setImages(images.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        if (product[key]) formData.append(key, product[key]);
      });

      images.filter((img) => !img.isNew).forEach((img) => formData.append("existingImages", img.src));
      images.filter((img) => img.isNew).forEach((img) => formData.append("productImages", img.file));

      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/productupdate/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Product updated successfully!");
      setTimeout(() => navigate("/allProducts"), 1500);
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage("❌ Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          ✏️ Update Product Details
        </h2>

        {loading && <p className="text-center text-gray-500 animate-pulse">Loading...</p>}
        {message && (
          <div
            className={`text-center mb-5 font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.catname}
                </option>
              ))}
            </select>
          </div>

          {/* Text Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.keys(product)
              .filter((key) => key !== "category" && key !== "description")
              .map((key) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={product[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${key}`}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                  />
                </div>
              ))}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Images <span className="text-gray-400 text-sm">(Max 5)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative group border rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={img.src}
                    alt={`preview-${index}`}
                    className="w-full h-32 object-cover group-hover:opacity-80 transition"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-md opacity-90 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-md"
          >
            {loading ? "Updating..." : "💾 Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
