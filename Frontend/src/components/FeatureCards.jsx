import React from 'react';

const FeatureCards = () => {
  return (
    <div className="flex justify-center gap-10 -mt-20 relative z-10 px-10">
       <div className="bg-white rounded-2xl shadow-xl p-6 w-72 text-center">
        <div className="text-red-500 text-3xl mb-2">🏠</div>
        <h3 className="font-semibold text-lg mb-1">Quality Materials</h3>
        <p className="text-gray-500 text-sm">
          We have all the Quality Roofing Products needed.
        </p>
      </div>

       <div className="bg-white rounded-2xl shadow-xl p-6 w-72 text-center">
        <div className="text-red-500 text-3xl mb-2">👷</div>
        <h3 className="font-semibold text-lg mb-1">Expert Engineer</h3>
        <p className="text-gray-500 text-sm">
          Our Roofing Team Members are Well Educated and Professional.
        </p>
      </div>

       <div className="bg-white rounded-2xl shadow-xl p-6 w-72 text-center">
        <div className="text-red-500 text-3xl mb-2">🧰</div>
        <h3 className="font-semibold text-lg mb-1">Quality Maintenance</h3>
        <p className="text-gray-500 text-sm">
          Ensure the Quality of work is our main goal to follow.
        </p>
      </div>
    </div>
  );
};

export default FeatureCards;
