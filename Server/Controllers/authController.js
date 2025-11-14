import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtp } from "../utils/sendOtp.js";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// -----------------------------------
// REGISTER
// -----------------------------------
export const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password)
            return res.status(400).json({ message: "All fields required" });

        const userExists = await User.findOne({ $or: [{ email }, { phone }] });

        if (userExists)
            return res.status(400).json({ message: "Email or phone already registered" });

        const user = await User.create({ name, email, phone, password });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------
// LOGIN WITH EMAIL & PASSWORD
// -----------------------------------
export const loginWithPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------
// SEND OTP
// -----------------------------------
export const sendLoginOtp = async (req, res) => {
    try {
        const { phone } = req.body;

        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ message: "Phone number not registered" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        await sendOtp(phone, otp);

        return res.json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------
// LOGIN WITH OTP
// -----------------------------------
export const loginWithOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        const user = await User.findOne({ phone });

        if (!user || user.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpiry < Date.now())
            return res.status(400).json({ message: "OTP expired" });

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------
// LOGOUT
// -----------------------------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        

        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
