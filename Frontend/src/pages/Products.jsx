import React from "react";
import ProductGrid from "../components/ProductGrid";

const Products = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-8 text-gray-800">
        Our Products
      </h1>
      <ProductGrid />
    </div>
  );
};

export default Products;
