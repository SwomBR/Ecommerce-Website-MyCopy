import { Router } from "express";
import Faq from "../Models/Faq.js";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";

const faqRoutes = Router();

faqRoutes.post("/addFAQ", authenticate, adminCheck, async (req, res) => {
  try {
    const { slnumber, question, category, answers } = req.body;
    if (!slnumber || !question || !category || !answers) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFAQ = new Faq({ slnumber, question, category, answers });
    await newFAQ.save();
    res.status(201).json({ message: "FAQ added successfully", faq: newFAQ });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

faqRoutes.put("/updateFAQ/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFAQ = await Faq.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFAQ)
      return res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ message: "FAQ updated successfully", faq: updatedFAQ });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

faqRoutes.get("/getAllFAQ", async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

faqRoutes.delete("/deleteFAQ/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFAQ = await Faq.findByIdAndDelete(id);

    if (!deletedFAQ)
      return res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default faqRoutes;
