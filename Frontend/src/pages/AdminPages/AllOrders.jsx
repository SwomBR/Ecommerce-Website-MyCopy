import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
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

  if (loading) return <div className="p-6 text-lg font-semibold">Loading orders...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Orders</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left border-b">Order ID</th>
              <th className="py-3 px-4 text-left border-b">User</th>
              <th className="py-3 px-4 text-left border-b">Items</th>
              <th className="py-3 px-4 text-left border-b">Total Price</th>
              <th className="py-3 px-4 text-left border-b">Payment</th>
              <th className="py-3 px-4 text-left border-b">Order Status</th>
              <th className="py-3 px-4 text-left border-b">Shipping Address</th>
              <th className="py-3 px-4 text-left border-b">Ordered At</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4 border-b">{order._id}</td>
                  <td className="py-3 px-4 border-b">{order.user?.name || "N/A"}</td>

                  <td className="py-3 px-4 border-b">
                    <ul className="list-disc list-inside">
                      {order.items?.map((item, idx) => (
                        <li key={idx}>
                          {item.productName} × {item.quantity} (${item.total})
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-3 px-4 border-b font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </td>

                  <td className="py-3 px-4 border-b">
                    <div>
                      <span className="block font-medium">{order.paymentMethod}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {order.shippingAddress && (
                      <>
                        {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}, {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                      </>
                    )}
                  </td>

                  <td className="py-3 px-4 border-b">
                    {new Date(order.orderedAt).toLocaleString()}
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

export default AllOrders;
