import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DetailsPage = () => {
  const { id } = useParams(); // route /viewProduct/:id
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

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
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading product details...
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
    feature,
    pattern,
    origin,
    moq,
    mrp,
    discountPercent,
    discountedPrice,
    weight,
    stockQty,
    size,
    thickness,
    battenDistance,
    coverage,
    breakStrength,
    description,
    waterAbsorb,
    model,
    usage,
    qtyPerSqFt,
    type,
    productImages,
  } = product;

  // ✅ Hide empty fields
  const details = [
    { label: "Material", value: material },
    { label: "Shape", value: shape },
    { label: "Color", value: color },
    { label: "Feature", value: feature },
    { label: "Pattern", value: pattern },
    { label: "Origin", value: origin },
    { label: "Application", value: application },
    { label: "Type", value: type },
    { label: "Size", value: size },
    { label: "Thickness", value: thickness },
    { label: "Coverage", value: coverage },
    { label: "Batten Distance", value: battenDistance },
    { label: "Break Strength", value: breakStrength },
    { label: "Water Absorb", value: waterAbsorb },
    { label: "Usage", value: usage },
    { label: "Model", value: model },
    { label: "Qty/SqFt", value: qtyPerSqFt },
    { label: "MOQ", value: moq },
    { label: "Weight", value: weight },
    { label: "Stock Qty", value: stockQty },
  ].filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      item.value !== "" &&
      item.value !== 0
  );

  // ✅ Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    adaptiveHeight: true,
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-10">
      {/* ---------- Product Images as Carousel ---------- */}
      <div className="md:w-1/2">
        {productImages && productImages.length > 0 ? (
          <Slider {...settings}>
            {productImages.map((img, idx) => (
              <div key={idx} className="flex justify-center">
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className="w-[400px] h-[400px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-gray-400 text-center">No image available</div>
        )}
      </div>

      {/* ---------- Product Details ---------- */}
      <div className="flex-1 text-gray-800">
        <h2 className="text-3xl font-bold mb-3">{productName}</h2>

        {category?.categoryName && (
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {category.categoryName}
          </p>
        )}

        {/* Basic Details */}
        {details.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            {details.map((item, index) => (
              <p key={index}>
                {item.label}: {item.value}
              </p>
            ))}
          </div>
        )}

        {/* Pricing Section */}
        {(mrp || discountedPrice) && (
          <div className="mt-6 text-lg">
            {mrp && (
              <p className="font-semibold">
                MRP: <span className="line-through text-gray-500">₹{mrp}</span>
              </p>
            )}
            {discountedPrice && (
              <p className="text-green-600 font-bold text-2xl">
                Discounted Price: ₹{discountedPrice}
              </p>
            )}
            {discountPercent > 0 && (
              <p className="text-sm text-gray-600">
                ({discountPercent}% Off)
              </p>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-8 bg-gray-700 text-white py-2 px-5 rounded-xl hover:bg-gray-800 transition"
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
