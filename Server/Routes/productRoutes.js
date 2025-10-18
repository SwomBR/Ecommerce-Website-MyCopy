import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import upload from "../Middleware/upload.js";
import Product from "../Models/Product.js";
import Category from "../Models/Category.js";

const productRoutes = Router();

const convertToBase64 = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString("base64")}`;
};

productRoutes.post("/addProducts", authenticate, adminCheck, upload.array("productImages", 5),  async (req, res) => {
    try {
      const { productName, prodId, category, material, shape, color, application, feature, pattern, origin, moq, mrp, discountPercent, weight, stockQty, size, thickness, battenDistance, coverage, breakStrength, description, waterAbsorb, model, usage, qtyPerSqFt, type,
      } = req.body;

      const existingProduct = await Product.findOne({ prodId });
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists!" });
      }

      const foundCategory = await Category.findById(category);
      if (!foundCategory) {
        return res.status(400).json({ message: "Invalid category selected!" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "At least one product image is required." });
      }

      const imageBase64Array = req.files.map((file) =>
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      );

      const MRP = Number(mrp) || 0;
      const Discount = Number(discountPercent) || 0;
      const discountedPrice = parseFloat(
        (MRP - (MRP * Discount) / 100).toFixed(2)
      );

      const newProduct = new Product({
        productName,
        prodId,
        category: foundCategory._id,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        moq: Number(moq) || 0,
        mrp: MRP,
        discountPercent: Discount,
        discountedPrice,
        weight,
        stockQty: Number(stockQty) || 0,
        productImages: imageBase64Array,
        size,
        thickness,
        battenDistance,
        coverage,
        breakStrength,
        description,
        waterAbsorb,
        model,
        usage,
        qtyPerSqFt,
        type,
      });

      await newProduct.save();

      res.status(201).json({
        message: "Product added successfully!",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Error adding product.", error: error.message });
    }
  }
);

productRoutes.get("/viewproduct/:prodId", authenticate, async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await Product.findOne({ prodId }).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product." });
  }
});

productRoutes.put( "/productupdate/:prodId", authenticate, adminCheck, upload.array("productImages", 5), async (req, res) => {
    try {
      const { prodId } = req.params;
      const {
        productName,
        category,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        moq,
        mrp,
        discountPercent,
        weight,
        stockQty,
        size,
        thickness,
        battenDistance,
        coverage,
        breakStrength,
        description,
        waterAbsorb,
        model,
        usage,
        qtyPerSqFt,
        type,
        existingImages,
      } = req.body;

      let categoryId;
      if (category) {
        const foundCategory = await Category.findById(category);
        if (!foundCategory) {
          return res.status(400).json({ message: "Invalid category selected!" });
        }
        categoryId = foundCategory._id;
      }

      let allImages = [];
      if (existingImages) {
        allImages = Array.isArray(existingImages)
          ? existingImages
          : [existingImages];
      }

      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(
          (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
        );
        allImages = [...allImages, ...newImages];
      }

      allImages = allImages.slice(0, 5);

      const updateFields = {
        productName,
        category: categoryId,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        moq: Number(moq) || 0,
        mrp: Number(mrp) || 0,
        discountPercent: Number(discountPercent) || 0,
        weight,
        stockQty: Number(stockQty) || 0,
        size,
        thickness,
        battenDistance,
        coverage,
        breakStrength,
        description,
        waterAbsorb,
        model,
        usage,
        qtyPerSqFt,
        type,
        productImages: allImages,
      };

      if (updateFields.mrp && updateFields.discountPercent >= 0) {
        updateFields.discountedPrice = parseFloat(
          ((updateFields.mrp * (100 - updateFields.discountPercent)) / 100).toFixed(2)
        );
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { prodId },
        { $set: updateFields },
        { new: true, runValidators: true }
      ).populate("category");

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Server error while updating product.", error: error.message });
    }
  }
);


productRoutes.delete("/deleteProduct/:prodId", authenticate, adminCheck, async (req, res) => {
    try {
      const { prodId } = req.params;
      const product = await Product.findOneAndDelete({ prodId });

      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }

      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        message: "Error deleting product.",
        error: error.message,
      });
    }
  }
);

productRoutes.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (!products.length) {
      return res.status(404).json({ message: "No products available." });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Error fetching products.",
      error: error.message,
    });
  }
});

export default productRoutes;
