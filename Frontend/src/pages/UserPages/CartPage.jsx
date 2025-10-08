import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart data
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

  // Update quantity
  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`/cart/${productId}`, { quantity }, { withCredentials: true });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
    }
  };

  // Remove product
  const handleRemove = async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`, { withCredentials: true });
      fetchCart();
    } catch (error) {
      console.error("Error removing product:", error.response?.data || error.message);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading cart...</div>;
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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.productImage}
                alt={item.product.productName}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.productName}</h3>
                <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                <p className="text-sm text-gray-700">
                  Subtotal: ₹{item.total.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="ml-4 text-red-500 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h3 className="text-lg font-semibold">Total: ₹{cart.totalPrice.toFixed(2)}</h3>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Proceed to Checkout c
        </button>
      </div>
    </div>
  );
};

export default CartPage;
