import express from "express";
import Cart from "../Models/cart.js";
import Product from "../Models/product.js";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";

const router = express.Router();


router.post("/cart", authenticate, userCheck, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const price = product.price;
    const itemTotal = price * quantity;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, price, total: itemTotal }],
        totalPrice: itemTotal
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].total =
          cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].price;
      } else {
        cart.items.push({ product: productId, quantity, price, total: itemTotal });
      }
    }

    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);
    await cart.save();

    res.status(200).json({ message: "Product added to cart.", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart.", error: error.message });
  }
});


router.get("/cart", authenticate, userCheck, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) return res.status(404).json({ message: "Cart not found." });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart.", error: error.message });
  }
});


router.put("/cart/:productId", authenticate, userCheck, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart." });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
      item.total = item.price * quantity;
    }

    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);
    await cart.save();

    res.status(200).json({ message: "Cart updated successfully.", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart.", error: error.message });
  }
});

router.delete("/cart/:productId", authenticate, userCheck, async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    const itemIndex = cart.items.findIndex((i) => i.product.toString() === productId);
    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart." });

    cart.items.splice(itemIndex, 1);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);
    await cart.save();

    res.status(200).json({ message: "Product removed from cart.", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing product from cart.", error: error.message });
  }
});

router.post("/cart/payment", authenticate, userCheck, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty. Add products to proceed." });
    }

    // You can integrate payment gateway here (Razorpay, Stripe, PayPal)
    const paymentInfo = {
      amount: cart.totalPrice,
      currency: "INR",
      paymentStatus: "success", // mock
      transactionId: "TXN" + Date.now()
    };

    res.status(200).json({
      message: "Payment successful (mock).",
      payment: paymentInfo
    });
  } catch (error) {
    res.status(500).json({ message: "Payment failed.", error: error.message });
  }
});


router.post("/cart/checkout", authenticate, userCheck, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty. Cannot checkout." });
    }

    // Here you can create an Order document before clearing cart
    // Example (optional):
    // const newOrder = new Order({
    //   user: req.user._id,
    //   items: cart.items,
    //   totalAmount: cart.totalPrice,
    //   status: "Confirmed",
    //   paymentStatus: "Paid"
    // });
    // await newOrder.save();

    // Clear cart after successful checkout
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      message: "Checkout successful. Your order has been placed.",
      // order: newOrder, // if using order model
    });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed.", error: error.message });
  }
});

export default router;
