import express, { response } from "express";
import { Todo } from "../models/todoModel.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const todo = await Todo.find({});

    return response.status(200).json({
      count: todo.length,
      data: todo,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

router.post("/", async (request, response) => {
  try {
    if (!request.body.todo) {
      return response
        .status(400)
        .send({ message: "send all required fields!" });
    }

    const newTodo = {
      todo: request.body.todo,
    };

    const todo = await Todo.create(newTodo);

    return response.status(201).send(todo);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return response.status(404).send({ message: "could not find todo..." });
    }

    const body = request.body;
    if ("completed" in body) todo.completed = body?.completed;
    if (body?.todo) todo.todo = body?.todo;

    await todo.save();

    return response.status(200).send(todo);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

router.post("/reset", async (request, response) => {
  try {
    const body = request.body;
    if (body?.reset) {
      const todos = await Todo.updateMany({}, { completed: false });

      return response.status(200).send(todos);
    }

    response.status(400).send({ message: "send all required fields" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Todo.findOneAndDelete({ _id: id });

    if (!result) {
      return response.status(404).json("Todo does not exist");
    }

    return response
      .status(200)
      .send({ message: "todo was removed successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});
export default router;
