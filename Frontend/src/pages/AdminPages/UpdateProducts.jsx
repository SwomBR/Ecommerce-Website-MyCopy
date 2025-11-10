import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const productDetailsFields = [
  ["Product Name", "productName", "text"],
  ["Product ID", "prodId", "text"],
  ["Category", "category", "select"],
  ["Application", "application", "text"],
  ["Usage", "usage", "text"],
  ["Model", "model", "text"],
];

const pricingStockFields = [
  ["Minimum Order Quantity", "moq", "number"],
  ["MRP", "mrp", "number"],
  ["Discount (%)", "discountPercent", "number"],
  ["Stock Quantity", "stockQty", "number"],
  ["Weight", "weight", "text"],
];

const specificationFields = [
  ["Material", "material"],
  ["Shape", "shape"],
  ["Color", "color"],
  ["Pattern", "pattern"],
  ["Origin", "origin"],
  ["Feature", "feature"],
  ["Size", "size"],
  ["Thickness", "thickness"],
  ["Batten Distance", "battenDistance"],
  ["Coverage", "coverage"],
  ["Breaking Strength", "breakStrength"],
  ["Water Absorbance", "waterAbsorb"],
  ["Quantity per Sq.ft", "qtyPerSqFt"],
  ["Type", "type"],
];

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    prodId: "",
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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const catRes = await axios.get("/api/allCategories");
        setCategories(catRes.data);

        const prodRes = await axios.get(`/api/viewproduct/${id}`, {
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
        alert("Error loading product details!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

   const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

   const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map((file) => ({
      src: URL.createObjectURL(file),
      isNew: true,
      file,
    }));
    setImages([...images, ...newImgs]);
  };

   const handleRemoveImage = (index) => setImages(images.filter((_, i) => i !== index));

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });

       images
        .filter((img) => !img.isNew)
        .forEach((img) => formData.append("existingImages", img.src));
      images
        .filter((img) => img.isNew)
        .forEach((img) => formData.append("productImages", img.file));

      const token = localStorage.getItem("token");
      await axios.put(`/api/productupdate/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully!");
      navigate("/allProducts");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Error updating product!");
    } finally {
      setLoading(false);
    }
  };

   const renderField = (label, name, type = "text") => (
    <div key={name} className="flex flex-col mb-4">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={product[name]}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.catname}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={product[name]}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>
  );

  return (
    <>
      <AdminNavbar />
      <div className="max-w-5xl ml-[500px] py-6 px-4 bg-white min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✏️ Update Product
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productDetailsFields.map(([label, name, type]) =>
                  renderField(label, name, type)
                )}
              </div>
            </section>

             
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Pricing & Stock</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricingStockFields.map(([label, name, type]) =>
                  renderField(label, name, type)
                )}
              </div>
            </section>

             
            <section className="mb-6">
              <label className="text-gray-700 font-medium mb-1 block">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </section>

             
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specificationFields.map(([label, name]) => renderField(label, name))}
              </div>
            </section>

        
            <section className="mb-6">
              <label className="text-gray-700 font-medium mb-2 block">
                Product Images <span className="text-gray-500 text-sm">(Max 5)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="border border-gray-300 rounded p-2 w-full"
              />

              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative border rounded overflow-hidden">
                      <img
                        src={img.src}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

             <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-8 rounded transition"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UpdateProducts;
