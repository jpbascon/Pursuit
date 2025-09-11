import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();                                                      // Load environment variables from .env file into process.env

const PORT = Number(process.env.PORT) || 5000;
const app = express();
app.use(cors({
  origin: ["https://pursuit-pi.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/a", userRoutes);

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