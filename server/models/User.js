import mongoose from "mongoose";

const userSchema = new mongoose.Schema(       // Define the schema (structure/blueprint) for a "User" document
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetOTP: String,
    resetOTPExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);      // Create a Mongoose model called "User" based on the schema (userSchema)
export default User;