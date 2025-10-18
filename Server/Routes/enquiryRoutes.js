import { Router } from "express";
import Enquiry from "../Models/Enquiry.js";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminCheck.js";
import userCheck from "../Middleware/userCheck.js";

const enquiryRoutes = Router();

enquiryRoutes.post("/addEnquiry", authenticate, userCheck, async (req, res) => {
  try {
    const { enquiryType, name, email, country, phone, message } = req.body;

    if (!enquiryType || !name || !email || !country || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEnquiry = new Enquiry({
      enquiryType,
      name,
      email,
      country,
      phone,
      message
    });

    await newEnquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully.", enquiry: newEnquiry });
  } catch (error) {
    res.status(500).json({ message: "Error submitting enquiry.", error: error.message });
  }
});

enquiryRoutes.get("/viewAllEnquiries", authenticate, adminCheck, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries.", error: error.message });
  }
});

enquiryRoutes.get("/viewEnquiry/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiry.", error: error.message });
  }
});

enquiryRoutes.patch("/markAsViewed/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { viewed: true },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found." });
    res.status(200).json({ message: "Enquiry marked as viewed", enquiry });
  } catch (error) {
    res.status(500).json({ message: "Error updating enquiry.", error: error.message });
  }
});

export default enquiryRoutes;
