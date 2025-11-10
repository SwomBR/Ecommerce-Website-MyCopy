import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="p-6 text-lg font-semibold">Loading order details...</div>;

  if (!order)
    return (
      <div className="p-6 text-center text-gray-600">
        Order not found.
        <button
          onClick={() => navigate("/orders")}
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Orders
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>

       
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Order ID:</span>
          <span>{order._id}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Total Price:</span>
          <span>₹{order.totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Payment Method:</span>
          <span>{order.paymentMethod}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Payment Status:</span>
          <span>{order.paymentStatus}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Order Status:</span>
          <span>{order.orderStatus}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700 font-semibold">Ordered At:</span>
          <span>{new Date(order.orderedAt).toLocaleString()}</span>
        </div>
      </div>

       
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
        <p>
          {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.state}, {order.shippingAddress?.postalCode},{" "}
          {order.shippingAddress?.country}
        </p>
      </div>

       <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-3">Ordered Items</h3>
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="py-2 px-3 border-b text-left">Product</th>
              <th className="py-2 px-3 border-b text-left">Quantity</th>
              <th className="py-2 px-3 border-b text-left">Price</th>
              <th className="py-2 px-3 border-b text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-2 px-3 border-b">{item.productName}</td>
                <td className="py-2 px-3 border-b">{item.quantity}</td>
                <td className="py-2 px-3 border-b">₹{item.price}</td>
                <td className="py-2 px-3 border-b">₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/orders")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default SingleOrder;
