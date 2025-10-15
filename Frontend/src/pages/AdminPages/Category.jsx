import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    catname: "",
    catId: "",
    description: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const itemsPerPage = 5;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/allCategories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("catname", formData.catname);
      data.append("catId", formData.catId);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const token = localStorage.getItem("token");

      if (editMode) {
        await axios.put(
          `http://127.0.0.1:8000/updateCategories/${editCategoryId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Category updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:8000/addCategories", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Category added successfully!");
      }

      setFormData({ catname: "", catId: "", description: "", image: null });
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
      catname: category.catname,
      catId: category.catId,
      description: category.description,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/deleteCategories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting category.");
    }
  };

  const handleImagePreview = (imgUrl) => setPreviewImage(imgUrl);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.catname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.catId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />
      <div className="bg-gray-200 ml-[250px] min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            {editMode ? "Edit Category" : "Add Category"}
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="catname"
                  value={formData.catname}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category ID
                </label>
                <input
                  type="text"
                  name="catId"
                  value={formData.catId}
                  onChange={handleChange}
                  placeholder="Enter category ID"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editMode
                  ? "Update Category"
                  : "Add Category"}
              </button>

              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditCategoryId(null);
                    setFormData({
                      catname: "",
                      catId: "",
                      description: "",
                      image: null,
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
            <h2 className="text-xl font-semibold text-gray-800">
              All Categories
            </h2>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category Table */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">ID</th>
                    <th className="px-5 py-3 text-left font-medium">Name</th>
                    <th className="px-5 py-3 text-left font-medium">
                      Description
                    </th>
                    <th className="px-5 py-3 text-left font-medium">Image</th>
                    <th className="px-5 py-3 text-center font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        Loading categories...
                      </td>
                    </tr>
                  ) : filteredCategories.length > 0 ? (
                    filteredCategories
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((cat) => (
                        <tr
                          key={cat._id}
                          className="border-b hover:bg-blue-50 transition"
                        >
                          <td className="px-5 py-3">{cat.catId}</td>
                          <td className="px-5 py-3 font-semibold text-gray-900">
                            {cat.catname}
                          </td>
                          <td
                            className="px-5 py-3 max-w-xs truncate"
                            title={cat.description}
                          >
                            {cat.description}
                          </td>
                          <td className="px-5 py-3">
                            {cat.image ? (
                              <img
                                src={cat.image}
                                alt={cat.catname}
                                className="w-14 h-14 rounded-lg object-cover border cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => handleImagePreview(cat.image)}
                              />
                            ) : (
                              <span className="italic text-gray-400">
                                No Image
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-center space-x-3">
                            <button
                              onClick={() => handleEdit(cat)}
                              className="p-2.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(cat._id)}
                              className="p-2.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 italic bg-gray-50"
                      >
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredCategories.length > itemsPerPage && (
            <div className="flex justify-end items-center mt-6 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-sm"
              >
                Prev
              </button>
              <span className="text-gray-700 text-sm">
                Page {currentPage} of{" "}
                {Math.ceil(filteredCategories.length / itemsPerPage)}
              </span>
              <button
                disabled={
                  currentPage ===
                  Math.ceil(filteredCategories.length / itemsPerPage)
                }
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-sm"
              >
                Next
              </button>
            </div>
          )}

          {/* Image Preview Modal */}
          {previewImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setPreviewImage(null)}
            >
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-3xl max-h-[80vh] rounded-xl shadow-2xl border-4 border-white"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
