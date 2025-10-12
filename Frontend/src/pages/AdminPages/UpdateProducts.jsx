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
  const [images, setImages] = useState([]); // { src, isNew, file? }
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch product and categories
  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch categories
        const catRes = await axios.get("http://localhost:8000/allCategories");
        setCategories(catRes.data);

        // Fetch product
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
        setMessage("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndCategories();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle image selection
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

  // ✅ Remove image
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // ✅ Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      // Append all text fields
      Object.keys(product).forEach((key) => {
        if (product[key] !== undefined && product[key] !== null) {
          formData.append(key, product[key]);
        }
      });

      // Append existing images
      images
        .filter((img) => !img.isNew)
        .forEach((img) => formData.append("existingImages", img.src));

      // Append new images
      images
        .filter((img) => img.isNew)
        .forEach((img) => formData.append("productImages", img.file));

      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/productupdate/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Product</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {message && <p className="text-center mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category dropdown */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.catname}
              </option>
            ))}
          </select>
        </div>

        {/* Other text fields */}
        {Object.keys(product)
          .filter((key) => key !== "category")
          .map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={product[key]}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>
          ))}

        {/* Images */}
        <div>
          <label className="block text-sm font-medium">Product Images (Max 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-2"
          />
          <div className="grid grid-cols-3 gap-3 mt-3">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.src}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
