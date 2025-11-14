import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

async function createAdmin() {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({ email: "admin@durocap.com" });

    if (exists) {
        console.log("Admin already exists!");
        process.exit();
    }

    const hashed = await bcrypt.hash("Admin@12345", 10);

    const admin = new User({
        name: "System Admin",
        email: "admin@durocap.com",
        password: hashed,
        role: "admin",
    });

    await admin.save();

    console.log("✔ Admin Created Successfully!");
    process.exit();
}

createAdmin();
