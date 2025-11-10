import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/allproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;

      setProducts(data);
      setFilteredProducts(data);

       const uniqueCats = [
        ...new Set(data.map((p) => p.category?.catname).filter(Boolean)),
      ];
      setCategories(uniqueCats);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

   const handleDelete = async (prodId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8000/deleteProduct/${prodId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted successfully!");
      const updated = products.filter((p) => p.prodId !== prodId);
      setProducts(updated);
      handleFilter(search, selectedCategory, updated);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

   const handleFilter = (searchText, category, productList = products) => {
    let filtered = productList;

    if (category !== "All") {
      filtered = filtered.filter(
        (p) => p.category?.catname?.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchText.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.productName?.toLowerCase().includes(searchText.toLowerCase()) ||
          p.prodId?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

   const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleFilter(value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    handleFilter(search, value);
  };

  if (loading)
    return <div className="p-6 text-lg font-semibold">Loading products...</div>;

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-200">
      <div className="p-6 max-w-7xl ml-[330px] bg-white shadow-md rounded-lg">
         <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">All Products</h2>

          <div className="flex flex-wrap gap-3 items-center">
             <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={handleSearchChange}
              className="border rounded px-3 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

             <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

             <button
              onClick={() => navigate("/add")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Product
            </button>
          </div>
        </div>

         {filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border bg-gray-50 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Product Name</th>
                  <th className="px-4 py-2 border-b text-left">Product ID</th>
                  <th className="px-4 py-2 border-b text-left">Category</th>
                  <th className="px-4 py-2 border-b text-left">MRP</th>
                  <th className="px-4 py-2 border-b text-left">Discount %</th>
                  <th className="px-4 py-2 border-b text-left">
                    Discounted Price
                  </th>
                  <th className="px-4 py-2 border-b text-left">Stock Qty</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => (
                  <tr key={prod._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{prod.productName}</td>
                    <td className="px-4 py-2">{prod.prodId}</td>
                    <td className="px-4 py-2">{prod.category?.catname || "—"}</td>
                    <td className="px-4 py-2">₹{prod.mrp?.toFixed(2)}</td>
                    <td className="px-4 py-2">{prod.discountPercent ?? 0}%</td>
                    <td className="px-4 py-2">
                      ₹{prod.discountedPrice?.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">{prod.stockQty ?? 0}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/viewProduct/${prod.prodId}`)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/update/${prod.prodId}`)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(prod.prodId)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default AllProducts;
