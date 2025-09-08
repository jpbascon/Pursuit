import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./authMiddleware.js";
import axios from "axios";
import crypto from "crypto";                                          // Creates token for email verification

dotenv.config();                                                      // Load environment variables from .env file into process.env

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = Number(process.env.PORT) || 5000;
const app = express();
const isProduction = process.env.MODE === "production";
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pursuit-pi.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/a", userRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running...");
});
app.post("/signup", async (req, res) => {
  try {
    const name = validator.escape(req.body.name?.trim());
    const email = validator.normalizeEmail(req.body.email?.trim());
    const password = req.body.password?.trim();
    const passwordConfirm = req.body.passwordConfirm?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUser = await User.findOne({ email });

    if (!email || !password) return res.status(400).json({ error: "All fields are required" });
    if (password !== passwordConfirm) return res.status(400).json({ error: "Passwords do not match" });
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters long" });
    if (existingUser) return res.status(409).json({ error: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000
    });
    const verifyUrl = process.env.MODE === "production" ? `https://pursuit-production.up.railway.app/verify-email?token=${verificationToken}&email=${email}` : `http://localhost:5000/verify-email?token=${verificationToken}&email=${email}`
    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: {
          from_email: process.env.ADMIN_EMAIL,
          to_email: email,
          subject: `Pursuit | Verify your account`,
          message: `Verify your account here ${verifyUrl}. This link is only eligible for 24 hours`,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    await newUser.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})
app.get("/verify-email", async (req, res) => {
  try {
    const { token, email } = req.query;
    const user = await User.findOne({ email, verificationToken: token });

    if (!user) return res.status(400).json({ error: "Invalid or expired verification link" });
    if (user.verificationTokenExpiry < Date.now()) return res.status(400).json({ error: "Verification token expired" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
    isProduction ? res.redirect("https://pursuit-production.up.railway.app/verify-email") : res.redirect("http://localhost:5173/verify-email");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
app.post("/login", async (req, res) => {
  try {
    const email = validator.normalizeEmail(req.body.email?.trim());
    const password = req.body.password?.trim();
    if (!email || !password) return res.status(400).json({ error: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect Password" });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
})
app.post("/contact", async (req, res) => {
  try {
    const email = validator.normalizeEmail(req.body.email?.trim());
    const subject = validator.escape(req.body.subject);
    const message = validator.escape(req.body.message);

    if (!email || !subject || !message) return res.status(400).json({ error: "All fields are required" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email address" });

    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: {
          from_email: process.env.ADMIN_EMAIL,
          to_email: process.env.ADMIN_EMAIL,
          reply_to: process.env.ADMIN_EMAIL,
          subject,
          message
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json({ success: true, message: "Message sent" });
  } catch (err) {
    res.status(500).json({
      error: "Failed to send email",
      details: err.message,
      stack: err.stack
    });
  }
})
app.post("/forgot-password", async (req, res) => {
  try {
    const email = validator.normalizeEmail(req.body.email?.trim());
    if (!email) return res.status(400).json({ error: "Email is required" });
    const user = await User.findOne({ email }).select("-password");
    if (!user) return res.status(404).json({ error: "Email does not exist" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    user.OTP = otp;
    user.OTPExpiry = Date.now() + 10 * 60 * 1000;
    res.cookie("resetData", JSON.stringify({ resetToken, email: user.email }), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: {
          from_email: process.env.ADMIN_EMAIL,
          to_email: email,
          subject: "Your OTP",
          message: `Your OTP is ${otp}. This code expires 10 minutes upon this email is sent.`
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    await user.save();
    res.json({ success: true, message: "OTP sent. Please check your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
app.post("/verify-otp", async (req, res) => {
  try {
    const resetData = req.cookies.resetData ? JSON.parse(req.cookies.resetData) : null;
    if (!resetData) return res.status(400).json({ error: "Reset token missing!" });
    const { resetToken, email } = resetData;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid or expired reset token" });
    const isValid = await bcrypt.compare(resetToken, user.resetToken);
    if (!isValid || Date.now() > user.resetTokenExpiry) return res.status(400).json({ error: "Invalid or expired reset token" });
    const otp = validator.escape(req.body.otp?.trim());
    if (!otp || user.OTP !== otp || Date.now() > user.OTPExpiry) return res.status(400).json({ error: "Invalid or expired OTP" });

    user.OTP = undefined;
    user.OTPExpiry = undefined;
    await user.save();
    res.json({ message: "OTP Verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
app.put("/reset-password", async (req, res) => {
  try {
    const password = req.body.password?.trim();
    const passwordConfirm = req.body.passwordConfirm?.trim();
    if (!password || !passwordConfirm) return res.status(400).json({ error: "All fields are required" });
    if (password !== passwordConfirm) return res.status(400).json({ error: "Passwords do not match" });
    const resetData = req.cookies.resetData ? JSON.parse(req.cookies.resetData) : null;
    if (!resetData) return res.status(400).json({ error: "No reset token found" });
    const { resetToken, email } = resetData;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    const isValid = await bcrypt.compare(resetToken, user.resetToken);
    if (!isValid || Date.now() > user.resetTokenExpiry) return res.status(400).json({ error: "Invalid or expired reset token" });
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) return res.status(400).json({ error: "You entered an old password!" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.clearCookie("resetData");
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.json({ error: err.message });
  }
})
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/me", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Starting server...");
    console.log("PORT:", PORT);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};
startServer();