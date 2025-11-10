import {Router} from "express";
import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";
import userCheck from "../Middleware/userCheck.js";
import adminCheck from "../Middleware/adminCheck.js";
import authenticate from "../Middleware/auth.js";

const orderRoutes = Router();

orderRoutes.post("/order/place",authenticate, userCheck, async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    for (const item of cart.items) {
      if (item.product.stockQty < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${item.product.productName}`,
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtOrder: item.priceAtAddTime,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity * item.priceAtOrder,
      0
    );

    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "Pending",
    });

    await newOrder.save();

    const session = await Product.startSession();
    session.startTransaction();
    try {
      for (const item of orderItems) {
        const product = await Product.findById(item.product).session(session);
        if (product.stockQty < item.quantity) {
          throw new Error(`Insufficient stock for ${product.productName}`);
        }
        product.stockQty -= item.quantity;
        await product.save({ session });
      }
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }

    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], totalAmount: 0 } }
    );

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


orderRoutes.get("/orders", userCheck,authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "productName price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


orderRoutes.get("/order/:id", userCheck, authenticate, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product", "productName price image");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

orderRoutes.put("/order/:id/cancel",authenticate, userCheck, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.orderStatus !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled." });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stockQty += item.quantity;
        await product.save();
      }
    }

    res.json({ message: "Order cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

orderRoutes.get("/admin/allOrders",authenticate, adminCheck, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "productName price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

orderRoutes.get("/admin/orderDetails/:id",authenticate, adminCheck, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "productName price image");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

orderRoutes.put("/admin/orderStatus/:id",authenticate, adminCheck, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "Pending",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Processing",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.orderStatus = status;
    await order.save();

    res.json({ message: "Order status updated successfully.", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default orderRoutes;
