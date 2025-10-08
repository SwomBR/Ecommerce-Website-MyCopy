import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProducts = () => {
  const { prodId } = useParams(); // Get product ID from URL a
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    categoryName: "",
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

  // ✅ Fetch product data when page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/product/${prodId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct(res.data);
        setPreview(res.data.productImage); // Show existing image
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [prodId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.keys(product).forEach((key) => formData.append(key, product[key]));
    if (productImage) formData.append("productImage", productImage);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/productupdate/${prodId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Product updated successfully!");
      setTimeout(() => navigate("/admin/products"), 2000); // redirect after success
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("❌ Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Product (ID: {prodId})
      </h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {message && <p className="text-center mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(product)
          .filter((key) => key !== "productImage")
          .map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={product[key]}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                required
              />
            </div>
          ))}

        {/* ✅ Image Upload */}
        <div>
          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover mt-3 rounded-lg border"
            />
          )}
        </div>

        {/* ✅ Submit Button */}
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
