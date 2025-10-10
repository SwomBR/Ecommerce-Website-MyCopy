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

productRoutes.post( "/addProducts", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
    try {
      const { productName, prodId, categoryId,   material, shape, color, application, feature, pattern, origin, reqPurchaseQty, mrp, discountPercent, weight, stockQty } = req.body;

      const existingProduct = await Product.findOne({ prodId });
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists!" });
      }

      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: "Invalid category selected!" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Product image is required" });
      }

      const imageBase64 = convertToBase64(req.file.buffer, req.file.mimetype);

      const discountedPrice = parseFloat(
        (mrp - (mrp * discountPercent) / 100).toFixed(2)
      );

      const newProduct = new Product({
        productName,
        prodId,
        category: category._id,  
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        reqPurchaseQty: Number(reqPurchaseQty),
        mrp: Number(mrp),
        discountPercent: Number(discountPercent),
        discountedPrice,
        weight,
        stockQty: Number(stockQty),
        productImage: imageBase64,
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully!", product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

productRoutes.get("/product/:prodId", authenticate, async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await Product.findOne({ prodId }).populate("category"); 

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

productRoutes.put( "/productupdate/:prodId", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
    try {
      const { prodId } = req.params;
      const { productName, categoryId,  material, shape, color, application, feature, pattern, origin, reqPurchaseQty, mrp, discountPercent, weight, stockQty, } = req.body;

      const updateFields = {
        productName,
        material,
        shape,
        color,
        application,
        feature,
        pattern,
        origin,
        reqPurchaseQty: Number(reqPurchaseQty),
        mrp: Number(mrp),
        discountPercent: Number(discountPercent),
        weight,
        stockQty: Number(stockQty),
      };

      if (categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(400).json({ message: "Invalid category selected!" });
        }
        updateFields.category = category._id;
      }

      if (req.file) {
        updateFields.productImage = convertToBase64(req.file.buffer, req.file.mimetype);
      }

      if (updateFields.mrp && updateFields.discountPercent >= 0) {
        updateFields.discountedPrice = parseFloat(
          (updateFields.mrp - (updateFields.mrp * updateFields.discountPercent) / 100).toFixed(2)
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
      res.status(500).json({ message: "Internal Server Error" });
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

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

productRoutes.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find().populate("category");

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
