// src/pages/admin/AdminLogin.jsx
import { useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/admin/login",data,
        { email, password },
        { withCredentials: true }
      );
      window.location.href = "/adminDashboard";
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded mt-1 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block font-semibold">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mt-1 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
