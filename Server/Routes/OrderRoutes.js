import { Router } from "express";
import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";
import authenticate from "../Middleware/auth.js"; 
import userCheck from "../Middleware/userCheck.js";       
import adminCheck from "../Middleware/adminCheck.js";    

const orderRoutes = Router();

orderRoutes.get("/allOrders/:userId", authenticate, userCheck, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("items.product");
    if (!orders.length) return res.status(404).json({ message: "No orders found" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

orderRoutes.get("/orderDetails/:orderId", authenticate, userCheck, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

orderRoutes.post("/placeOrder/:userId", authenticate, userCheck, async (req, res) => {
  try {
    const { userId } = req.params;
    const { shippingAddress, paymentMethod, discountAmount = 0 } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const items = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtAddTime,
      totalItemPrice: item.priceAtAddTime * item.quantity,
    }));

    const totalAmount = items.reduce((sum, i) => sum + i.totalItemPrice, 0);
    const finalAmount = totalAmount - discountAmount;

    const newOrder = new Order({
      user: userId,
      items,
      shippingAddress,
      totalAmount,
      discountAmount,
      finalAmount,
      paymentMethod,
      paymentStatus: "completed",
      orderStatus: "confirmed",
    });

    await newOrder.save();

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

orderRoutes.patch("/status/:orderId", authenticate, adminCheck, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;
    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


orderRoutes.get("/admin/allOrders", authenticate, adminCheck, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .populate("items.product");
    if (!orders.length) return res.status(404).json({ message: "No orders found" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

orderRoutes.get("/admin/userOrders/:userId", authenticate, adminCheck, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("items.product")
      .populate("user", "name email");
    if (!orders.length) return res.status(404).json({ message: "No orders found for this user" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

orderRoutes.get("/admin/orderDetails/:orderId", authenticate, adminCheck, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("items.product")
      .populate("user", "name email phone");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default orderRoutes;
