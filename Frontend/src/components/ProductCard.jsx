import React from "react";

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-200">
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {product.productName}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{product.categoryName}</p>
        <p className="text-gray-700 mt-2 font-semibold">
          ₹{product.mrp}{" "}
          <span className="text-green-600 text-sm">
            ({product.discountPercent}% Off)
          </span>
        </p>
        <button
          onClick={() => onViewDetails(product.prodId)}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
