import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    address: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const url = editIndex !== null
      ? `/api/profile/address/${editIndex}`
      : "/api/profile/address";

    const method = editIndex !== null ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving address");

      setUser({ ...user, addresses: data.addresses });
      setFormData({ address: "", district: "", state: "", country: "", pinCode: "" });
      setEditIndex(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete this address?")) return;

    try {
      const res = await fetch(`/api/profile/address/${index}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUser({ ...user, addresses: data.addresses });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (index) => {
    const addr = user.addresses[index];
    setFormData(addr);
    setEditIndex(index);
  };

  if (loading) return <div className="p-6 text-lg font-semibold">Loading profile...</div>;
  if (!user) return <div className="p-6 text-center text-gray-600">Profile not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>

       
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        <p><span className="font-semibold">User Role:</span> {user.userRole}</p>
      </div>

       
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editIndex !== null ? "Edit Address" : "Add Address"}
        </h3>

        {error && <div className="bg-red-100 text-red-700 px-3 py-2 mb-3 rounded">{error}</div>}

        <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border px-3 py-2 rounded" />
          <input name="district" value={formData.district} onChange={handleChange} placeholder="District" className="border px-3 py-2 rounded" />
          <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="border px-3 py-2 rounded" />
          <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="border px-3 py-2 rounded" />
          <input name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin Code" className="border px-3 py-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-1 md:col-span-2">
            {editIndex !== null ? "Update Address" : "Add Address"}
          </button>
        </form>
      </div>

       
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
        {user.addresses.length === 0 ? (
          <p className="text-gray-500">No addresses added yet.</p>
        ) : (
          <div className="space-y-4">
            {user.addresses.map((addr, i) => (
              <div key={i} className="border rounded-lg p-4 flex justify-between items-start">
                <div>
                  <p>{addr.address}</p>
                  <p>{addr.district}, {addr.state}</p>
                  <p>{addr.country} - {addr.pinCode}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(i)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(i)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
