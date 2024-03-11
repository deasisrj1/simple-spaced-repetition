import mongoose, { mongo } from "mongoose";

const todosSchema = mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, "Please provide a Task to create!"],
    },
    completed: { type: Boolean, default: false },
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

export const Todo = mongoose.model("Todo", todosSchema);
