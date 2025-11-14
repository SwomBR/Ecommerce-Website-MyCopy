import Admin from "../Models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// -------------------------------
// ADMIN LOGIN
// -------------------------------
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin)
            return res.status(400).json({ message: "Admin not found" });

        const passMatch = await bcrypt.compare(password, admin.password);
        if (!passMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(admin._id);

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false,           // ❗ must be false locally
            sameSite: "lax",         // ❗ safest option for local env
        });

        return res.json({ message: "Admin login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// -------------------------------
// ADMIN LOGOUT
// -------------------------------
export const adminLogout = async (req, res) => {
    try {
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: false,           // ❗ must be false locally
            sameSite: "lax",         // ❗ safest option for local env
        });

        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
