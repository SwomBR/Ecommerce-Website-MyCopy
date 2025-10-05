import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userRole: "user",
    address: "",
    district: "",
    state: "",
    country: "",
    pinCode: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      return setMessage("Invalid email format");
    }
    if (!formData.phone.match(/^[0-9]{7,15}$/)) {
      return setMessage("Invalid phone number");
    }
    if (formData.password.length < 6) {
      return setMessage("Password must be at least 6 characters");
    }

    // Structure the address object as per the schema
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      userRole: formData.userRole,
      addresses: [
        {
          address: formData.address,
          district: formData.district,
          state: formData.state,
          country: formData.country,
          pinCode: Number(formData.pinCode)
        }
      ]
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful!");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Address Section */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="pinCode"
          placeholder="Pin Code"
          value={formData.pinCode}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
