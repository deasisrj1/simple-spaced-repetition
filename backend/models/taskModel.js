import mongoose, { mongo } from "mongoose";

const taskSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, "Please provide a Topic to study!"],
    },
    nextSession: {
      type: String,
      default: "1-day",
      enum: ["1-day", "7-days", "16-days", "35-days"],
      required: true,
    },
    link: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
