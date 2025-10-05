import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import upload from "../Middleware/upload.js";
import Product from "../Models/Product.js";

const productRoutes = Router();

// Convert buffer to base64 string
const convertToBase64 = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString("base64")}`;
};

// ✅ Add Product
productRoutes.post(
  "/addProducts",
  authenticate,
  adminCheck,
  upload.single("productImage"),
  async (req, res) => {
    try {
      const {
        productName,
        prodId,
        categoryName,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        reqPurchaseQty,
        mrp,
        discountPercent,
        weight,
        stockQty,
      } = req.body;

      // Check for existing product
      const existingProduct = await Product.findOne({ prodId });
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists!" });
      }

      // Convert image to base64
      let imageBase64 = null;
      if (req.file) {
        imageBase64 = convertToBase64(req.file.buffer, req.file.mimetype);
      } else {
        return res.status(400).json({ message: "Product image is required" });
      }

      // Create new product (discountedPrice will auto-calculate via schema)
      const newProduct = new Product({
        productName,
        prodId,
        categoryName,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        reqPurchaseQty: parseInt(reqPurchaseQty),
        mrp: parseFloat(mrp),
        discountPercent: parseFloat(discountPercent),
        weight,
        stockQty: parseInt(stockQty),
        productImage: imageBase64,
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// ✅ Get Single Product by prodId
productRoutes.get("/product/:prodId", authenticate, async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await Product.findOne({ prodId });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Update Product
productRoutes.put(
  "/productupdate/:prodId",
  authenticate,
  adminCheck,
  upload.single("productImage"),
  async (req, res) => {
    try {
      const { prodId } = req.params;
      const {
        productName,
        categoryName,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        reqPurchaseQty,
        mrp,
        discountPercent,
        weight,
        stockQty,
      } = req.body;

      // Build update object dynamically
      const updateFields = {
        productName,
        categoryName,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        reqPurchaseQty: parseInt(reqPurchaseQty),
        mrp: parseFloat(mrp),
        discountPercent: parseFloat(discountPercent),
        weight,
        stockQty: parseInt(stockQty),
      };

      // Handle new image upload
      if (req.file) {
        const imageBase64 = convertToBase64(req.file.buffer, req.file.mimetype);
        updateFields.productImage = imageBase64;
      }

      // Find and update product
      const updatedProduct = await Product.findOneAndUpdate(
        { prodId },
        { $set: updateFields },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }

      // discountedPrice will auto-recalculate on next save trigger
      await updatedProduct.save();

      res
        .status(200)
        .json({ message: "Product updated successfully!", product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// ✅ Delete Product
productRoutes.delete(
  "/deleteProduct/:prodId",
  authenticate,
  adminCheck,
  async (req, res) => {
    try {
      const { prodId } = req.params;
      const product = await Product.findOneAndDelete({ prodId });

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// ✅ Get All Products
productRoutes.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products.length) {
      return res.status(404).json({ message: "No products available" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default productRoutes;
