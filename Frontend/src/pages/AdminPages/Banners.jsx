import React, { useEffect, useState } from "react";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banners");
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Add new banner
  const handleAddBanner = async (e) => {
    e.preventDefault();
    setError("");
    if (!image || !purpose.trim()) {
      setError("Please select an image and enter a purpose.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("purpose", purpose);

    setLoading(true);
    try {
      const res = await fetch("/api/admin/banner", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming token is stored
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error adding banner");
      setPurpose("");
      setImage(null);
      fetchBanners();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      const res = await fetch(`/api/admin/banner/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error deleting banner");
      fetchBanners();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Banners</h2>

      {/* Add Banner Form */}
      <form
        onSubmit={handleAddBanner}
        className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Add New Banner</h3>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 mb-3 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Banner Purpose
          </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="e.g. Homepage, Sale, Festival..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Add Banner"}
        </button>
      </form>

      {/* Banner List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">All Banners</h3>

        {banners.length === 0 ? (
          <p className="text-gray-500">No banners available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="border rounded-lg shadow-sm p-3 flex flex-col items-center text-center"
              >
                <img
                  src={`data:image/jpeg;base64,${banner.image}`}
                  alt={banner.purpose}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <p className="font-medium mb-2">{banner.purpose}</p>
                <button
                  onClick={() => handleDelete(banner._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banners;
