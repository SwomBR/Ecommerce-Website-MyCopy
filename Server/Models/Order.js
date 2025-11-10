import { Schema, model } from "mongoose";
import Product from "./Product.js";

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true, },
  quantity: { type: Number, required: true, min: 1,},
  priceAtPurchase: { type: Number, required: true, min: 0,},
  totalItemPrice: { type: Number, required: true, min: 0 },
}, { _id: false });

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [orderItemSchema],
    required: true,
  },
  shippingAddress: {
    address: { type: String, trim: true, required: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    pinCode: { type: Number, min: 100000, max: 999999 },
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  finalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "card", "upi", "wallet"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
}, { timestamps: true });

/**
 * ✅ Pre-save Hook: Calculate total & final amount
 */
orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((sum, item) => sum + item.totalItemPrice, 0);
  this.finalAmount = parseFloat((this.totalAmount - this.discountAmount).toFixed(2));
  next();
});


orderSchema.post("save", async function (doc, next) {
  try {
    if (doc.orderStatus === "pending" || doc.orderStatus === "confirmed") {
      for (const item of doc.items) {
        const product = await Product.findById(item.product);

        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }

        if (product.stockQty < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.productName}`);
        }

        product.stockQty -= item.quantity;
        await product.save();
      }
    }

    next();
  } catch (error) {
    console.error("Error updating product stock:", error.message);
    next(error);
  }
});

const Order = model("Order", orderSchema);
export default Order;
