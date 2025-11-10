import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("additional");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [message, setMessage] = useState("");

   useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/viewproduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setMessage("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold">Product not found.</p>
        </div>
      </div>
    );
  }

  const {
    productName,
    category,
    material,
    shape,
    color,
    application,
    origin,
    moq,
    mrp,
    discountPercent,
    discountedPrice,
    stockQty,
    qtyPerSqFt,
    description,
    productImages,
  } = product;

   
  const mainDetails = [
    { label: "Minimum Order Quantity", value: moq },
    { label: "Qty/SqFt", value: qtyPerSqFt },
    { label: "Application", value: application },
    { label: "Material", value: material },
    { label: "Shape", value: shape },
    { label: "Color", value: color },
    { label: "Origin", value: origin },
  ].filter(item => item.value !== undefined && item.value !== null && item.value !== "" && item.value !== 0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);
      setMessage("");
      const token = localStorage.getItem("token");
      if (!token) return setMessage("Please log in to add items to your cart.");
      const res = await axios.post(
        "http://localhost:8000/cart/add",
        { productId: product._id, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      setMessage(error.response?.data?.message || "Failed to add product to cart.");
    } finally {
      setCartLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
       <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <span>/</span>
            <span className="hover:text-gray-700 cursor-pointer">{category?.catname || "Product"}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{productName}</span>
          </nav>
        </div>
      </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {productImages?.length ? (
              <Slider {...sliderSettings}>
                {productImages.map((img, idx) => (
                  <div key={idx} className="outline-none">
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`${productName} ${idx + 1}`}
                        className="w-full h-96 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {category?.catname || "Product"}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                (stockQty ?? 0) > 0 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {(stockQty ?? 0) > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{productName}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.9 (120 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{discountedPrice || mrp}</span>
              {mrp && discountedPrice && mrp > discountedPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{mrp}</span>
                  {discountPercent > 0 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-green-100 text-green-800">
                      {discountPercent}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

             {mainDetails.length > 0 && (
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Product Details</h3>
                <div className="space-y-3">
                  {mainDetails.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

             <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))} 
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-gray-900 min-w-16 text-center border-x border-gray-300">
                    {qty}
                  </span>
                  <button 
                    onClick={() => setQty(qty + 1)} 
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                  className={`flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm ${
                    cartLoading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <ShoppingCart size={20} />
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </button>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm font-medium ${
                  message.includes("Failed") || message.includes("log in")
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-green-50 text-green-800 border border-green-200"
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

     
      {(description || mainDetails.length > 0) && (
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex space-x-1 border-b border-gray-200 mb-8">
              {description && (
                <button 
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "description" 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
              )}
              {mainDetails.length > 0 && (
                <button 
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "additional" 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("additional")}
                >
                  Additional Information
                </button>
              )}
            </div>

            <div className="max-w-4xl">
              {activeTab === "description" && description && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>
              )}

              {activeTab === "additional" && mainDetails.length > 0 && (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Attribute
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mainDetails.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-sm font-medium text-gray-900">
                            {item.label}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;