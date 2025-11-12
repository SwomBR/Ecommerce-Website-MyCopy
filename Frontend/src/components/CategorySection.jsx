import React, { useEffect, useState } from "react";
import axios from "axios";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/allCategories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a78] text-center mb-8">
        Our Categories
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-600">No categories available.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {visibleCategories.map((category) => (
              <div
                key={category._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 w-52"
              >
                <img
                  src={category.image || "/images/default.jpg"}
                  alt={category.catname}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800">{category.catname}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {categories.length > 5 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-[#1e2a78] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2938a0] transition"
              >
                {showAll ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CategorySection;
