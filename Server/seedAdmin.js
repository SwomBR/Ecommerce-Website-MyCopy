import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./Models/Admin.js";

dotenv.config();

mongoose.connect("mongodb://localhost:27017/DuroCap")
    .then(async () => {
        console.log("Connected to DB");

        const adminExists = await Admin.findOne({ email: "admin@durocap.com" });

        if (!adminExists) {
            await Admin.create({
                name: "Super Admin",
                email: "admin@durocap.com",
                password: "Admin@123"
            });
            console.log("Admin created successfully");
        } else {
            console.log("Admin already exists");
        }

        mongoose.connection.close();
    })
    .catch(err => console.error(err));
