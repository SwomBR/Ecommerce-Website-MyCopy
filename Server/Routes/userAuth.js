import { Router } from "express";
import {
    register,
    loginWithPassword,
    sendLoginOtp,
    loginWithOtp,
    logout
} from "../Controllers/authController.js";

export const userAuth = Router();

// Register new user
userAuth.post("/register", register);

// Login through email & password
userAuth.post("/login", loginWithPassword);

// Send OTP to phone
userAuth.post("/send-otp", sendLoginOtp);

// Login with phone + OTP
userAuth.post("/login-otp", loginWithOtp);

// Logout
userAuth.post("/logout", logout);
