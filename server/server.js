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

dotenv.config();                                                      // Load environment variables from .env file into process.env

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 8080;
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

/* REGISTRATION */
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

/* LOGIN */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
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
      sameSite: "none",
    });
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
})

/* API */
app.get("/api", async (req, res) => {
  try {
    const users = await User.find();                                  // Fetch all users based on the User schema and returns a JavaScript object
    res.json(users);                                                  // Send them as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

/* GET REQUEST */
app.get("/api/:id", async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id);
    if (!findUser) return res.status(404).json({ error: "ID not found" });
    res.json(findUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

/* PUT REQUEST */
app.put("/api/:id", async (req, res) => {
  try {
    const updates = {};

    if (req.body.email) {
      const email = validator.normalizeEmail(req.body.email);
      if (!email) return res.status(400).json({ error: "Invalid user email" });
      updates.email = email;
    }
    if (req.body.password) {
      const password = validator.escape(req.body.password);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      if (!password) return res.status(400).json({ error: "Invalid user password" });
      updates.password = hashedPassword;
    }

    // Checks if updates properties is equal to 0
    if (Object.keys(updates).length === 0) return res.status(400).json({ error: "No valid fields provided" });
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

/* DELETE REQUEST */
app.delete("/api/:id", async (req, res) => {
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
    console.log("Connected to MongoDB");
    console.log(process.env.PORT);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};
startServer();