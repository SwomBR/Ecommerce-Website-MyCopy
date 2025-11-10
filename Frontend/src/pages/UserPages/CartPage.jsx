import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

   const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

   const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/cart/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
    } finally {
      setUpdating(false);
    }
  };

   const handleRemove = async (productId) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing product:", error.response?.data || error.message);
    } finally {
      setUpdating(false);
    }
  };

   const handleClearCart = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:8000/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error.message);
    } finally {
      setUpdating(false);
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
        {cart.items.map((item) => {
          const price = item.price ?? 0;
          const quantity = item.quantity ?? 1;
          const total = price * quantity;

          return (
            <div
              key={item.product._id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.productImage || item.product.productImages?.[0]}
                  alt={item.product.productName}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.productName}</h3>
                  <p className="text-sm text-gray-500">₹{price.toFixed(2)} each</p>
                  <p className="text-sm text-gray-700">Subtotal: ₹{total.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(item.product._id, quantity - 1)}
                  disabled={updating}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product._id, quantity + 1)}
                  disabled={updating}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.product._id)}
                  disabled={updating}
                  className="ml-4 text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-4">
        <h3 className="text-lg font-semibold">
          Total: ₹{(cart.totalAmount ?? 0).toFixed(2)}
        </h3>

        <div className="flex gap-3">
          <button
            onClick={handleClearCart}
            disabled={updating}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </button>

          <button
            onClick={() => navigate("/checkout")}
            disabled={updating}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
