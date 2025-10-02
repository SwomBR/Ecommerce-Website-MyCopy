import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import upload from "../Middleware/upload.js";
import Product from "../Models/Product.js";

const productRoutes = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

productRoutes.post("/addProducts", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
    try {
        const { productName, prodId, categoryName, material, shape, color, application, feature, pattern, origin, reqPurchaseQty, mrp, discountPercent, weight, stockQty } = req.body;
    
        const existingProduct = await Product.findOne({ prodId });
        if (existingProduct) {
          return res.status(400).json({ message: "Product already exists!" });
        }
    
        let imageBase64 = null;
        if (req.file) {
          imageBase64 = convertToBase64(req.file.buffer);
        }
    
        const discountedPrice = mrp - (mrp * discountPercent) / 100;
    
        const newProduct = new Product({
          productName :productName,
          prodId :prodId, 
          categoryName:categoryName,
          brand : brand,
          dietaryType:dietaryType,
          mrp:mrp,
          discountPercent:discountPercent,
          discountedPrice,
          weight:weight,
          stockQty:stockQty,
          material:material, 
          shape:shape, 
          color :color, 
          application:application, 
          feature : feature, 
          pattern : pattern, 
          origin : origin, 
          reqPurchaseQty : reqPurchaseQty,
          productImage: imageBase64,
        });
    
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully!" });
    
    } 
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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

  productRoutes.put( "/productupdate/:prodId", authenticate, adminCheck, upload.single("productImage"), async (req, res) => {
    try {
      const { prodId } = req.params;
      const { productName, categoryName, brand, dietaryType, mrp, discountPercent, weight, stockQty } = req.body;

      let updateFields = {
        productName,
        categoryName,
        brand,
        dietaryType,
        mrp: parseFloat(mrp),
        discountPercent: parseFloat(discountPercent),
        discountedPrice: parseFloat((mrp - (mrp * discountPercent) / 100).toFixed(2)),
        weight,
        stockQty: parseInt(stockQty),
      };

      if (req.file) {
        const imageBase64 = req.file.buffer.toString("base64");
        updateFields.productImage = `data:${req.file.mimetype};base64,${imageBase64}`;
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { prodId }, 
        { $set: updateFields }, 
        { new: true }
      );

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

productRoutes.delete('/deleteProduct/:prodId', authenticate, adminCheck, async (req, res) => {
  try {
    const {prodId } = req.params;
    const product = await Product.findOneAndDelete({ prodId });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

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