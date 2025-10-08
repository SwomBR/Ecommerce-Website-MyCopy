import express from "express";
import authenticate from "../Middleware/auth.js";
import userCheck from "../Middleware/userCheck.js";
import User from "../Models/user.js";

const router = express.Router();

/**
 * @route   GET /profile
 * @desc    Get logged-in user's profile
 * @access  User only
 */
router.get("/profile", authenticate, userCheck, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

/**
 * @route   POST /profile/address
 * @desc    Add new address
 * @access  User only
 */
router.post("/profile/address", authenticate, userCheck, async (req, res) => {
  try {
    const { address, district, state, country, pinCode } = req.body;
    if (!address || !district || !state || !country || !pinCode) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(req.user._id);
    user.addresses.push({ address, district, state, country, pinCode });
    await user.save();

    res.status(201).json({ message: "Address added successfully", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: "Error adding address", error: err.message });
  }
});

/**
 * @route   PUT /profile/address/:index
 * @desc    Edit existing address (by index)
 * @access  User only
 */
router.put("/profile/address/:index", authenticate, userCheck, async (req, res) => {
  try {
    const { index } = req.params;
    const { address, district, state, country, pinCode } = req.body;

    const user = await User.findById(req.user._id);
    if (!user.addresses[index]) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.addresses[index] = { address, district, state, country, pinCode };
    await user.save();

    res.status(200).json({ message: "Address updated", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: "Error updating address", error: err.message });
  }
});

/**
 * @route   DELETE /profile/address/:index
 * @desc    Delete an address (by index)
 * @access  User only
 */
router.delete("/profile/address/:index", authenticate, userCheck, async (req, res) => {
  try {
    const { index } = req.params;

    const user = await User.findById(req.user._id);
    if (!user.addresses[index]) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.addresses.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Address deleted", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: "Error deleting address", error: err.message });
  }
});

export default router;
