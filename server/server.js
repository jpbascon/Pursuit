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
import nodemailer from "nodemailer";

dotenv.config();                                                      // Load environment variables from .env file into process.env

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = Number(process.env.PORT) || 5000;
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pursuit-pi.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());                                              // Parse incoming requests with JSON bodies (req.body)
app.use("/a", userRoutes);                                            // Sets the endpoint for authenticated routes
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

    const salt = await bcrypt.genSalt(10);                                  // Generates random string for hashing
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });    // Creates a document instance according to User schema
    await newUser.save();                                                   // Checks for validation according to User schema before saving

    res.status(201).json({ message: "Account registered" });                // Appends the new user into /users as JSON

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})
app.post("/login", async (req, res) => {
  try {
    const email = validator.normalizeEmail(req.body.email?.trim());
    const password = validator.escape(req.body.password?.trim());
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
      secure: false,
      sameSite: "lax"
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
    const subject = validator.escape(req.body.subject?.trim());
    const message = validator.escape(req.body.message?.trim());
    if (!email || !subject || !message) return res.status(400).json({ error: "All fields are required" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email address" });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${email}`,
      text: `From: ${email}\nSubject: ${subject}\nMessage: \n\n${message}`
    }
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Message fail to send" });
  }
})
app.get("/users", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const user = await User.findOne({ email }).select("-password");
    if (!user) return res.status(404).json({ message: "Email does not exist" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ err: "Server error" });
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
app.put("/me", async (req, res) => {
  try {
    const updates = {};
    if (req.body.password === req.body.passwordConfirm) res.status(400).json({ error: "Passwords do not match" });
    if (req.body.password) {
      const password = validator.escape(req.body.password);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      if (!password) return res.status(400).json({ error: "Invalid user password" });
      updates.password = hashedPassword;
    }
    if (Object.keys(updates).length === 0) return res.status(400).json({ error: "No valid fields provided" });
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Password changed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})
app.delete("/me", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
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
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};
startServer();