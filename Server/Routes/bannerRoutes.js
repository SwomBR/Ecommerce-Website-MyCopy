import express from "express";
import upload from "../middleware/multer.js";
import authenticate from "../middleware/auth.js";
import adminCheck from "../middleware/adminCheck.js";
import Banner from "../Models/Banner.js";

const router = express.Router();

router.post("/admin/banner", authenticate, adminCheck, upload.single("image"), async (req, res) => {
  try {
    const { purpose } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required." });
    }

    const imageBase64 = req.file.buffer.toString("base64");

    const banner = new Banner({
      image: imageBase64,
      purpose,
    });

    await banner.save();
    res.status(201).json({ message: "Banner added successfully", banner });
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({ message: "Server error while adding banner" });
  }
});


router.delete("/admin/banner/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ message: "Server error while deleting banner" });
  }
});


router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: "Server error while fetching banners" });
  }
});

export default router;
