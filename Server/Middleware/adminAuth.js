import jwt from "jsonwebtoken";
import Admin from "../Models/Admin.js";

export const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;

        if (!token)
            return res.status(401).json({ message: "Not authorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin")
            return res.status(403).json({ message: "Admin access only" });

        const admin = await Admin.findById(decoded.id);
        if (!admin)
            return res.status(401).json({ message: "Admin not found" });

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
