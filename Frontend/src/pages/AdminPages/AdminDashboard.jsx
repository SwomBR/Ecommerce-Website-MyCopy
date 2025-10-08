import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch dashboard stats
  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch dashboard data");
      setStats(data.stats);
      setRecentOrders(data.recentOrders);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return <div className="p-6 text-lg font-semibold">Loading Dashboard...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow text-center border-t-4 border-blue-500">
          <h3 className="text-gray-500 text-sm uppercase">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center border-t-4 border-green-500">
          <h3 className="text-gray-500 text-sm uppercase">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center border-t-4 border-purple-500">
          <h3 className="text-gray-500 text-sm uppercase">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center border-t-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm uppercase">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ₹{stats.totalRevenue?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View All
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 rounded-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Order ID</th>
                  <th className="px-4 py-2 border-b text-left">Customer</th>
                  <th className="px-4 py-2 border-b text-left">Total</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                  <th className="px-4 py-2 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                  >
                    <td className="px-4 py-2">{order._id.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-2">{order.user?.name || "Unknown"}</td>
                    <td className="px-4 py-2">₹{order.totalPrice}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
