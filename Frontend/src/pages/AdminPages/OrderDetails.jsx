import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [updating, setUpdating] = useState(false);

   const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error fetching order");
      setOrder(data);
      setOrderStatus(data.orderStatus);
      setPaymentStatus(data.paymentStatus);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

   const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderStatus, paymentStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating status");
      setOrder(data.order);
      alert("Order status updated successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="p-6 text-lg font-semibold">Loading order details...</div>;
  if (!order) return <div className="p-6 text-gray-600">Order not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>

       <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Info</h3>
        <div className="text-gray-600">
          <p><strong>Name:</strong> {order.user?.name}</p>
          <p><strong>Email:</strong> {order.user?.email}</p>
        </div>
      </div>

       <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Address</h3>
        <div className="text-gray-600">
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>
          <p>
            {order.shippingAddress.country} - {order.shippingAddress.postalCode}
          </p>
        </div>
      </div>

       <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Ordered Items</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Product</th>
                <th className="px-4 py-2 border-b text-left">Quantity</th>
                <th className="px-4 py-2 border-b text-left">Price</th>
                <th className="px-4 py-2 border-b text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.productName}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">₹{item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 font-medium">₹{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Info</h3>
          <p><strong>Method:</strong> {order.paymentMethod}</p>
          <p><strong>Status:</strong> {order.paymentStatus}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h3>
          <p><strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}</p>
          <p><strong>Ordered At:</strong> {new Date(order.orderedAt).toLocaleString()}</p>
          <p><strong>Order Status:</strong> {order.orderStatus}</p>
        </div>
      </div>

       <form
        onSubmit={handleUpdateStatus}
        className="bg-gray-50 p-4 rounded-lg border mb-6"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Update Order / Payment Status
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Order Status
            </label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            >
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Payment Status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className={`bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition ${
            updating ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {updating ? "Updating..." : "Update Status"}
        </button>
      </form>

      <button
        onClick={() => navigate("/admin/orders")}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Back to All Orders
      </button>
    </div>
  );
};

export default OrderDetails;
