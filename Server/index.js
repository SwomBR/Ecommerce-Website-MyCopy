// index.js
import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import { userAuth } from "./Routes/userAuth.js";
import productRoutes from "./Routes/productRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import enquiryRoutes from "./Routes/enquiryRoutes.js";
import addressRoutes from "./Routes/addresses.js";
import cartRoutes from "./Routes/cartRoutes.js";
import orderRoutes from "./Routes/OrderRoutes.js";
import faqRoutes from "./Routes/faqRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

dotenv.config();

const app = express();

// --------------------- CORS CONFIG ---------------------
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// --------------------- MIDDLEWARE ---------------------
app.use(json());
app.use(cookieParser());

// --------------------- ROUTES ---------------------
app.use("/", userAuth);
app.use("/", adminRoutes);
app.use("/", productRoutes);
app.use("/", categoryRoutes);
app.use("/", enquiryRoutes);
app.use("/", addressRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", faqRoutes);

// --------------------- DATABASE CONNECTION ---------------------
mongoose.connect("mongodb://localhost:27017/DuroCap")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// --------------------- START SERVER ---------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
