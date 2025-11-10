import React, { useState } from "react";

const CategorySection = () => {
  const categories = [
    { id: 1, name: "Roof Repair", image: "/images/roof-repair.jpg" },
    { id: 2, name: "Metal Roofing", image: "/images/metal-roof.jpg" },
    { id: 3, name: "Waterproof Coating", image: "/images/waterproof.jpg" },
    { id: 4, name: "Tile Roofing", image: "/images/tile-roof.jpg" },
    { id: 5, name: "Solar Roofing", image: "/images/solar-roof.jpg" },
    { id: 6, name: "Gutter Installation", image: "/images/gutter.jpg" },
    { id: 7, name: "Roof Cleaning", image: "/images/cleaning.jpg" },
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a78] text-center mb-8">
        Our Categories
      </h2>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 w-52"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
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
    </section>
  );
};

export default CategorySection;
