import express from "express";
import { authMiddleware } from "../authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/profile", async (req, res) => {
  try {
    res.json({ message: `Welcome to your profile, ${req.user.email}. You are authenticated` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})
router.get("/dashboard", async (req, res) => {
  try {
    res.json({ message: `Welcome to the dashboard, ${req.user.email}. You are authenticated` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
})
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: `Logged out ${req.user.email} successfully` });
});
export default router;