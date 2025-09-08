import express from "express";
import { authMiddleware } from "../authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    res.json({ message: `Welcome to your profile, ${req.user.email}. You are authenticated` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    res.json({ message: `Welcome to the dashboard, ${req.user.name}. You are authenticated` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})
router.post("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token");
  res.json({ message: `Logged out successfully` });
});
export default router;