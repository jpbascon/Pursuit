import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["Health & Fitness", "Career Development", "Personal Growth", "Financial Goals", "Relationships", "Community Service"],
      required: true
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    milestones: [
      {
        text: {
          type: String,
          trim: true
        },
        completed: {
          type: Boolean,
          default: false
        }
      }
    ],
    progress: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;