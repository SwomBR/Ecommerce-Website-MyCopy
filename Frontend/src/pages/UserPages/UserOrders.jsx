import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <div className="p-6 text-lg font-semibold">Loading your orders...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left border-b">Order ID</th>
              <th className="py-3 px-4 text-left border-b">Total Price</th>
              <th className="py-3 px-4 text-left border-b">Payment Status</th>
              <th className="py-3 px-4 text-left border-b">Order Status</th>
              <th className="py-3 px-4 text-left border-b">Ordered At</th>
              <th className="py-3 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  You haven’t placed any orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4 border-b">{order._id}</td>
                  <td className="py-3 px-4 border-b font-semibold">
                    ₹{order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {new Date(order.orderedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
