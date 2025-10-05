import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", image: null });
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000";

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Add or update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      if (editMode) {
        await axios.put(`${API_URL}/admin/categories/${editCategoryId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Category updated successfully!");
      } else {
        await axios.post(`${API_URL}/admin/categories`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Category added successfully!");
      }

      setFormData({ name: "", description: "", image: null });
      setEditMode(false);
      setEditCategoryId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving category.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setFormData({
      name: category.name,
      description: category.description,
      image: null, // image needs to be re-uploaded if changed
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${API_URL}/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting category.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editMode ? "Edit Category" : "Add Category"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-5 mb-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Saving..." : editMode ? "Update Category" : "Add Category"}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setEditCategoryId(null);
              setFormData({ name: "", description: "", image: null });
            }}
            className="ml-3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <h2 className="text-xl font-semibold mb-2">All Categories</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat._id} className="border-t">
                  <td className="p-3 border">{cat.name}</td>
                  <td className="p-3 border">{cat.description}</td>
                  <td className="p-3 border">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
