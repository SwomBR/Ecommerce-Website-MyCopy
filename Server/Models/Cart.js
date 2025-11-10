import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtAddTime: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: false });

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // One cart per user
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.priceAtAddTime * item.quantity,
    0
  );
  next();
});

cartSchema.pre("save", function(next) {
  if (this.items.length === 0) this.totalAmount = 0;
  next();
});

cartSchema.methods.addItem = function(productId, price, quantity = 1) {
  const existingItem = this.items.find(item => item.product.equals(productId));
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ product: productId, quantity, priceAtAddTime: price });
  }
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.priceAtAddTime * item.quantity,
    0
  );
  return this.save();
};


const Cart = model("Cart", cartSchema);
export default Cart;
