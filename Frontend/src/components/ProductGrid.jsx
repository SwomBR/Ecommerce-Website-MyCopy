import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/allproducts");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleViewDetails = (prodId) => {
    navigate(`/product/${prodId}`);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="text-center py-10 text-gray-500">No products found.</div>;
  }

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
