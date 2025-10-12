import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authImage from "../assets/authImage.png"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
      }

      localStorage.setItem("token", data.token);

      if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials: Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Outer Box */}
      <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Side - Image */}
        <div className="w-1/2 bg-green-600 flex items-center justify-center">
          <img
            src={authImage}
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Sign In
          </h2>

          {error && (
            <p className="text-center text-red-500 mb-4 font-medium">{error}</p>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all font-semibold"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
