import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    const [ addedToCart, setAddedToCart ] = useState();    
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (addedToCart || loading) return;
        
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMsg("Please log in to add products to the cart.");
          setTimeout(() => navigate("/SignIn"), 2000);
          return;
        }

        try {
            setLoading(true);
            const response = await fetch("/api/addToCart", {
              method: "POST",
              credentials: "include", 
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                prodId: product._id, 
              }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMsg(errorData.message || "Error adding product to cart");
                return;
              }
        
              setAddedToCart(true);
            } catch (error) {
              setErrorMsg("Error adding product to cart");
            } finally {
              setLoading(false);
            }
        };
    
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-72 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <Link to={`/productDetailsPage/${product._id}`} aria-label={`View details for ${product.productName}`}>
                <img
                  src={product.productImage?.trim() ? `data:image/jpeg;base64,${product.productImage}` : "https://via.placeholder.com/150"}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                  alt={product.productName || "Product Image"}
                />
              </Link>
        
              <h3 className="text-lg font-semibold text-gray-900">{product.productName}</h3>
              <p className="text-md text-gray-700 font-bold">{product.brand}</p>
              <p className="text-sm text-gray-600 font-bold">{product.weight}</p>
        
              <div className="mt-3 flex justify-between items-center">
                <div>
                  {product.mrp && <p className="text-gray-500 line-through text-sm">₹{product.mrp}</p>}
                  <p className="text-green-600 font-bold text-lg">₹{product.discountedPrice}</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-md transition duration-300 ${
                    addedToCart || loading
                      ? "bg-gray-400 cursor-not-allowed scale-95"
                      : "bg-green-500 hover:bg-green-600 text-white scale-100"
                  } transform`}
                  onClick={handleAddToCart}
                  disabled={addedToCart || loading}
                >
                  {addedToCart ? "Added" : loading ? "Adding..." : "Add"}
                </button>
              </div>
        
              {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
            </div>
    );
};

export default ProductCard;