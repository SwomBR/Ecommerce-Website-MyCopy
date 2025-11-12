import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn, User } from "lucide-react";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout", { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white shadow-md px-8 py-2">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 ml-[80px]">
        <Link to="/home" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-[250px] h-[70px] object-contain"
          />
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex space-x-4 items-center">
        {["home", "about", "products", "services", "projects", "contact"].map(
          (item) => (
            <Link
              key={item}
              to={`/${item}`}
              className="text-black hover:text-[#00b4d8] text-lg transition duration-300 uppercase"
            >
              {item === "about"
                ? "ABOUT US"
                : item === "contact"
                ? "CONTACT US"
                : item}
            </Link>
          )
        )}

        {/* Curved User / Signin Section */}
        <div className="ml-6 bg-[#00b4d8] text-white px-6 py-2 rounded-[40px] flex items-center gap-4 shadow-md">
          {!user ? (
            <Link
              to="/signin"
              className="flex items-center gap-2 hover:text-gray-100 text-lg transition duration-300 font-medium"
            >
              <LogIn className="w-5 h-5" />
              SIGN IN
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="hover:text-gray-100 text-lg transition duration-300 font-medium flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                <span className="capitalize">{user.name}</span>
                <span className="text-sm">▼</span>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-200 origin-top-right ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {user.role === "admin" ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/cart"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Cart
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
