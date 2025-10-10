import { Router } from "express";
import Category from "../Models/Category.js";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";

const categoryRoutes = Router();

categoryRoutes.post("addCategories", authenticate, adminCheck, async (req, res) => {
  try {
    const { catname, catId, description, image } = req.body;

    const existingCategory = await Category.findOne({
      $or: [{ catname }, { catId }]
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name or ID already exists." });
    }

    const newCategory = new Category({ catname, catId, description, image });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully.", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category.", error: error.message });
  }
});

categoryRoutes.get("/viewCategories/:catId", async (req, res) => {
  try {
    const { catId } = req.params;

    const category = await Category.findOne({ catId });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category.", error: error.message });
  }
});

categoryRoutes.get("/allCategories", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
});


categoryRoutes.put("/updateCategories/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const { catname, description, image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { catname, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category updated successfully.", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating category.", error: error.message });
  }
});

categoryRoutes.delete("/deleteCategories/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category.", error: error.message });
  }
});

export default categoryRoutes;
