import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailsPage = () => {
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${prodId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [prodId]);

  if (!product) {
    return <div className="text-center py-10 text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="p-8 flex flex-col md:flex-row items-center gap-10">
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-96 h-96 object-cover rounded-2xl shadow-md"
      />

      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {product.productName}
        </h2>
        <p className="text-gray-600 mb-2">
          Category: <span className="font-semibold">{product.categoryName}</span>
        </p>
        <p className="text-gray-600 mb-2">Material: {product.material}</p>
        <p className="text-gray-600 mb-2">Shape: {product.shape}</p>
        <p className="text-gray-600 mb-2">Color: {product.color}</p>
        <p className="text-gray-600 mb-2">Feature: {product.feature}</p>
        <p className="text-gray-600 mb-2">Pattern: {product.pattern}</p>
        <p className="text-gray-600 mb-2">Origin: {product.origin}</p>
        <p className="text-gray-700 mt-4 text-lg font-semibold">
          Price: ₹{product.mrp}{" "}
          <span className="text-green-600 text-base">
            ({product.discountPercent}% off)
          </span>
        </p>
        <p className="text-gray-500 mt-2">Available Stock: {product.stockQty}</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gray-700 text-white py-2 px-5 rounded-xl hover:bg-gray-800 transition"
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
