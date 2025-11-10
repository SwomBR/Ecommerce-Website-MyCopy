import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

   const fetchCart = async () => {
    try {
      const res = await axios.get("/cart", { withCredentials: true });
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

   const handlePayment = async () => {
    try {
      setProcessing(true);
      const paymentRes = await axios.post("/cart/payment", {}, { withCredentials: true });
      console.log("Payment Response:", paymentRes.data);

       const checkoutRes = await axios.post("/cart/checkout", {}, { withCredentials: true });
      console.log("Checkout Response:", checkoutRes.data);

      alert("Order placed successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error during checkout:", error.response?.data || error.message);
      alert("Payment or checkout failed!");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading checkout...</div>;
  if (!cart || cart.items.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600">
        Your cart is empty.{" "}
        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 underline"
        >
          Go shopping
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        {cart.items.map((item) => (
          <div key={item.product._id} className="flex justify-between border-b pb-2">
            <span>{item.product.productName}</span>
            <span>
              {item.quantity} × ₹{item.price.toFixed(2)} = ₹{item.total.toFixed(2)}
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-2 font-semibold text-lg">
          <span>Total</span>
          <span>₹{cart.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          disabled={processing}
          onClick={handlePayment}
          className={`px-6 py-2 rounded-lg text-white ${
            processing ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {processing ? "Processing..." : "Pay & Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
