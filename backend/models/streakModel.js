import mongoose from "mongoose";

const streakSchema = mongoose.Schema({
  count: { type: Number, default: 0 },
});

export const Streak = mongoose.model("streak", streakSchema);
