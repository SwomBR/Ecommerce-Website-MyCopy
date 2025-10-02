import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
      total: { type: Number, required: true, min: 0 }
    }
  ],
  totalPrice: { type: Number, required: true, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

cartSchema.pre("save", function(next) {
  this.totalPrice = this.items.reduce((sum, item) => sum + (item.total || 0), 0);
  next();
});

const Cart = model("Cart", cartSchema);
export default Cart;
