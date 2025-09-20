import express from "express";
import { authMiddleware } from "../authMiddleware.js";
import User from "../models/User.js";
import Goal from "../models/Goal.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";                                          // Creates token for email verification

const router = express.Router();
const isProduction = process.env.MODE === "production";
const JWT_SECRET = process.env.JWT_SECRET;
const passwordStrength = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^/A-Za-z0-9]/.test(password);
  return hasUpperCase && hasNumber && hasSpecialChar;
}
const sendBrevoEmail = async ({ to, subject, html, text }) => {
  try {
    const res = await axios.post("https://api.brevo.com/v3/smtp/email", {
      sender: { name: "Pursuit App", email: process.env.BREVO_SMTP_ADMIN },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text
    }, {
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      }
    });
    console.log("Brevo email sent:", res.data);
    return res.data;
  } catch (err) {
    console.error("Brevo API error:", err.response?.data || err.message);
    throw new Error("Failed to send email");
  }
}
router.post("/signup", async (req, res) => {
  try {
    const name = validator.escape(req.body.name?.trim());
    const email = validator.escape(req.body.email?.trim());
    const password = req.body.password?.trim();
    const passwordConfirm = req.body.passwordConfirm?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUser = await User.findOne({ email });
    const isLongEnough = password.length >= 8;
    if (!email || !password) return res.status(400).json({ error: "All fields are required" });
    if (password !== passwordConfirm) return res.status(400).json({ error: "Passwords do not match" });
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" });
    if (!isLongEnough) return res.status(400).json({ error: "Password must be at least 8 characters long" });
    if (!passwordStrength(password)) return res.status(400).json({ error: "Password must contain an upper case letter, a number, and a special character" })
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
    await newUser.save();
    const verifyUrl = `https://pursuit-production.up.railway.app/a/verify-email?token=${verificationToken}&email=${email}`;
    await sendBrevoEmail({
      to: email,
      subject: "Pursuit - Verify Your Email",
      text: `Hello ${name},\n\nPlease verify your email by clicking the link below:\n${verifyUrl}\n\nThis link will expire in 24 hours.`,
      html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
        <p><a href="${verifyUrl}" target="_blank">Verify Email</a></p>
        <p>This link will expire in 24 hours.</p>`
    })
    res.json({ success: true, message: "Signup successful! A verification link is sent to your inbox." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})
router.get("/verify-email", async (req, res) => {
  try {
    const { email, token } = req.query;
    const user = await User.findOne({ email, verificationToken: token });
    if (!user) return res.status(400).json({ error: "Invalid or expired verification link" });
    if (user.verificationTokenExpiry < Date.now()) return res.status(400).json({ error: "Verification token expired" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
    res.redirect("https://pursuit-pi.vercel.app/verify-email?status=success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.post("/login", async (req, res) => {
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
      httpOnly: isProduction ? true : false,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });
    return res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
})
router.post("/forgot-password", async (req, res) => {
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
      httpOnly: isProduction ? true : false,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });
    await sendBrevoEmail({
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });
    await user.save();
    res.json({ success: true, message: "OTP sent. Please check your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.post("/verify-otp", async (req, res) => {
  try {
    const resetData = req.cookies.resetData ? JSON.parse(req.cookies.resetData) : null;
    if (!resetData) return res.status(400).json({ error: "Reset token missing!" });
    const { resetToken, email } = resetData;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid or expired reset token" });
    const isValid = await bcrypt.compare(resetToken, user.resetToken);
    if (!isValid || Date.now() > user.resetTokenExpiry) return res.status(400).json({ error: "Invalid or expired reset token" });

    let rawOtp = "";
    if (Array.isArray(req.body.otp)) {
      rawOtp = req.body.otp.join("");
    } else if (typeof req.body.otp === "string") {
      rawOtp = req.body.otp;
    } else {
      return res.status(400).json({ error: "OTP format invalid" });
    }
    const otp = validator.escape((rawOtp || "").trim());
    if (!otp || user.OTP !== otp || Date.now() > user.OTPExpiry) return res.status(400).json({ error: "Invalid or expired OTP" });
    user.OTP = undefined;
    user.OTPExpiry = undefined;
    await user.save();
    res.json({ success: true, message: "OTP Verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/reset-password", async (req, res) => {
  try {
    const password = req.body.password?.trim();
    const passwordConfirm = req.body.passwordConfirm?.trim();
    const isLongEnough = password.length >= 8;
    if (!password || !passwordConfirm) return res.status(400).json({ error: "All fields are required" });
    if (password !== passwordConfirm) return res.status(400).json({ error: "Passwords do not match" });
    if (!isLongEnough) return res.status(400).json({ error: "Password must be 8 characters long or more" });
    if (!passwordStrength(password)) return res.status(400).json({ error: "Password must contain an upper case letter, a number, and a special character" })
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
    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    res.json({ error: err.message });
  }
})
router.get("/auth-check", authMiddleware, async (req, res) => {
  try {
    res.json({ message: `Welcome to the dashboard, ${req.user.name}. You are authenticated` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})
router.post("/logout", authMiddleware, (req, res) => {
  const user = res.clearCookie("token");
  if (!user) return res.json({ error: "Failed to clear cookie" });
  res.json({ message: `Logged out successfully` });
});
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ id: user._id, name: user.name, email: user.email, message: "Session restored" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/contact", async (req, res) => {
  try {
    const email = validator.normalizeEmail(req.body.email?.trim());
    const subject = validator.escape(req.body.subject);
    const message = validator.escape(req.body.message);

    if (!email || !subject || !message) return res.status(400).json({ error: "All fields are required" });
    if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email address" });
    await sendBrevoEmail({
      to: process.env.BREVO_SMTP_ADMIN,
      subject: `Pursuit - ${subject}`,
      text: `From: ${email}\n\n${message}`,
      html: `<p>From: ${email}</p><p>${message}</p>`,
    });
    return res.json({ success: true, message: "Message sent" });
  } catch (err) {
    res.status(500).json({
      error: "Failed to send email",
      details: err.message,
      stack: err.stack
    });
  }
})
router.post("/add-goal", authMiddleware, async (req, res) => {
  try {
    const goalTitle = req.body.goalTitle?.trim();
    const milestones = req.body.milestones
    const { category, frequency, deadline } = req.body;
    if (!goalTitle || !category) return res.status(400).json({ error: "Missing required fields!" });
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ error: "User not found" });
    const existingGoal = await Goal.findOne({ user: req.user.id, title: goalTitle });
    if (existingGoal) return res.status(400).json({ error: "Goal already created" });

    const newGoal = new Goal({
      user: user.id,
      title: goalTitle,
      category,
      frequency,
      deadline: new Date(deadline),
      milestones
    })
    await newGoal.save();
    res.json({ success: true, message: "Goal created" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
})
router.delete("/delete-goal/:id", authMiddleware, async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
})
router.get("/user-goal-check", authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    if (!goals || goals.length === 0) return res.status(400).json({ success: false, error: "You currently have no ongoing activity" });
    res.json({
      success: true,
      goals: goals.map(g => ({
        _id: g._id,
        title: g.title,
        milestones: g.milestones || [],
        category: g.category,
        frequency: g.frequency,
        deadline: g.deadline,
        progress: g.progress,
        completed: g.completed
      }))
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
})
router.put("/update-milestone", authMiddleware, async (req, res) => {
  try {
    const { id, idx } = req.body;
    const path = `milestones.${idx}.completed`;
    const goal = await Goal.findByIdAndUpdate(
      id,
      { $set: { [path]: true } },
      { new: true },
    )
    if (!goal) return res.status(404).json({ success: false, message: "Goal not found" });
    res.status(200).json({ success: true, message: "Milestone upodated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
})
export default router;