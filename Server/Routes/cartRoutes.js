import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

const cartRoutes = Router();

cartRoutes.get("/cart", authenticate, userCheck, async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: err.message });
  }
});
 
cartRoutes.post("/cart/add", authenticate, userCheck, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.stockQty < quantity) {
      return res
        .status(400)
        .json({ message: `Only ${product.stockQty} units available.` });
    }

    const price = product.discountedPrice || product.mrp;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stockQty) {
        return res.status(400).json({
          message: `Cannot add ${quantity} more. Only ${product.stockQty - existingItem.quantity
            } left in stock.`,
        });
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity, priceAtAddTime: price });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.priceAtAddTime * item.quantity,
      0
    );

    await cart.save();
    await cart.populate("items.product");

    res.json({
      message: "Item added to cart successfully.",
      cart,
    });
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ error: err.message });
  }
});

cartRoutes.put("/cart/update", authenticate, userCheck, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required." });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1." });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const item = cart.items.find((item) =>
      item.product.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (quantity > product.stockQty) {
      return res
        .status(400)
        .json({ message: `Only ${product.stockQty} units available.` });
    }

    item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.priceAtAddTime * i.quantity,
      0
    );

    await cart.save();
    await cart.populate("items.product");

    res.json({
      message: "Cart updated successfully.",
      cart,
    });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ error: err.message });
  }
});

cartRoutes.delete(
  "/cart/remove/:productId",
  authenticate,
  userCheck,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;

      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
      }

      const initialLength = cart.items.length;
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );

      if (cart.items.length === initialLength) {
        return res.status(404).json({ message: "Item not found in cart." });
      }

      cart.totalAmount = cart.items.reduce(
        (sum, item) => sum + item.priceAtAddTime * item.quantity,
        0
      );

      await cart.save();
      await cart.populate("items.product");

      res.json({
        message: "Item removed from cart successfully.",
        cart,
      });
    } catch (err) {
      console.error("Error removing item:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

cartRoutes.delete("/cart/clear", authenticate, userCheck, async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], totalAmount: 0 } },
      { new: true, upsert: true }
    );

    res.json({
      message: "Cart cleared successfully.",
      cart,
    });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ error: err.message });
  }
});

export default cartRoutes;
