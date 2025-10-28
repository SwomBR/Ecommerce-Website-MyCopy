import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please log in to add items to your cart.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/cart/add",
        { productId: product._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message || "Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage(error.response?.data?.message || "Failed to add product to cart.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleViewDetails = () => {
    navigate(`/viewProduct/${product.prodId}`); 
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-200">
      <img
        src={product.productImages?.[0]}
        alt={product.productName}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={handleViewDetails}
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.productName}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {product.category?.catname || "Uncategorized"}
        </p>

        <div className="mt-2">
          <p className="text-gray-700 font-semibold">
            ₹{product.discountedPrice || product.mrp}{" "}
            {product.discountPercent > 0 && (
              <span className="text-sm text-green-600">({product.discountPercent}% OFF)</span>
            )}
          </p>
          {product.discountedPrice && product.discountedPrice < product.mrp && (
            <p className="text-xs text-gray-500 line-through">₹{product.mrp}</p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={`mt-3 w-full py-2 rounded-xl text-white transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>

        {message && <p className="mt-2 text-sm text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
