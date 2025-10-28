import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="w-64 bg-white shadow-xl flex flex-col fixed h-full justify-between z-20">
      <div>
        <div className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-indigo-50">
          <h2 className="text-2xl font-semibold text-indigo-600">
            Admin Dashboard
          </h2>
          <button className="text-gray-500 hover:text-indigo-600">
            <i className="fas fa-angle-left"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <Link
            to="/adminDashboard"
            className="flex items-center p-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium"
          >
            <i className="fas fa-tachometer-alt mr-3"></i> Dashboard
          </Link>

          <div className="space-y-2 mt-4">
            <Link
              to="/category"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              <i className="fas fa-shopping-bag mr-3"></i> Categories
            </Link>

            <Link
              to="/addproduct"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              <i className="fas fa-list mr-3"></i> Add Product
            </Link>

            <Link
              to="/allproducts"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              <i className="fas fa-truck mr-3"></i> All Products
            </Link>

            <Link
              to="/allEnq"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              <i className="fas fa-users mr-3"></i> Enquiries
            </Link>
            <Link
              to="/faqAdmin"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium"
            >
              <i className="fas fa-users mr-3"></i> FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 py-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
