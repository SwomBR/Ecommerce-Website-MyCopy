import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const navigate = useNavigate();

  const getPrice = (p) => {
    if (!p && p !== 0) return 0;
    if (typeof p === "number") return p;
    if (typeof p === "string") {
      const cleaned = p.replace(/[^\d.-]+/g, "");
      const n = parseFloat(cleaned);
      return Number.isFinite(n) ? n : 0;
    }
    if (typeof p === "object") {
      return getPrice(p.price || p.amount || p.value);
    }
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:8000/allproducts"),
          axios.get("http://localhost:8000/allcategories"),
        ]);
        setProducts(productRes.data || []);
        setFiltered(productRes.data || []);
        setCategories(categoryRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let temp = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter((p) =>
        (p.prodname || p.productName || p.name || "")
          .toString()
          .toLowerCase()
          .includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      temp = temp.filter((p) => {
        const cat =
          (typeof p.category === "object"
            ? p.category?.catname || p.category?.name
            : p.category) || "";
        return cat.toString().toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    // Sorting
    if (sortOrder === "priceAsc")
      temp.sort((a, b) => getPrice(a.price) - getPrice(b.price));
    else if (sortOrder === "priceDesc")
      temp.sort((a, b) => getPrice(b.price) - getPrice(a.price));
    else if (sortOrder === "alphaAsc")
      temp.sort((a, b) =>
        (a.prodname || a.productName || a.name || "").localeCompare(
          b.prodname || b.productName || b.name || ""
        )
      );
    else if (sortOrder === "alphaDesc")
      temp.sort((a, b) =>
        (b.prodname || b.productName || b.name || "").localeCompare(
          a.prodname || a.productName || a.name || ""
        )
      );

    setFiltered(temp);
  }, [search, selectedCategory, sortOrder, products]);

  const handleViewDetails = (id) => navigate(`/product/${id}`);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600">Loading products...</div>
    );

  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      {/* Header */}
      <div className="text-center py-8 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800">Our Products</h1>
      </div>

      {/* Filter Bar */}
      <div className="bg-white sticky top-0 z-10 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/3 focus:ring focus:ring-blue-200 outline-none"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring focus:ring-blue-200 outline-none"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.catname}>
              {cat.catname}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring focus:ring-blue-200 outline-none"
        >
          <option value="none">Sort by</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="alphaAsc">Name: A → Z</option>
          <option value="alphaDesc">Name: Z → A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="p-6">
        {filtered.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
