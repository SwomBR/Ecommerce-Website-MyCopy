import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      productName: { type: String, required: true, trim: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
      total: { type: Number, required: true, min: 0 }
    }
  ],
  shippingAddress: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true, match: [/^\d{4,10}$/, "Invalid postal code"] },
    country: { type: String, required: true, trim: true }
  },
  paymentMethod: { type: String, required: true, enum: ["COD", "Credit Card", "UPI", "NetBanking"] },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  orderStatus: { type: String, enum: ["Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" },
  totalPrice: { type: Number, required: true, default: 0, min: 0 },
  orderedAt: { type: Date, default: Date.now }
}, { timestamps: true });

orderSchema.pre("save", function(next) {
  this.totalPrice = this.items.reduce((sum, item) => sum + (item.total || 0), 0);
  next();
});

const Order = model("Order", orderSchema);

export default Order;
