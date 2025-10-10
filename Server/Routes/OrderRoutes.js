import express from "express";
import Order from "../Models/order.js";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";

const router = express.Router();


router.get("/admin/orders", authenticate, adminCheck, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price");

    res.status(200).json({
      message: "Orders fetched successfully",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});


router.get("/admin/orders/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});


router.put("/admin/orders/:id/status", authenticate, adminCheck, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const allowedOrderStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    const allowedPaymentStatuses = ["Pending", "Paid", "Failed"];

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus && allowedOrderStatuses.includes(orderStatus)) {
      order.orderStatus = orderStatus;
    }

    if (paymentStatus && allowedPaymentStatuses.includes(paymentStatus)) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
});

export default router;