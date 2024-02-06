import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Task } from "./models/taskModel.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

app.post("/", async (request, response) => {
  try {
    if (!request.body.topic) {
      return response
        .status(400)
        .send({ message: "send all required fields..." });
    }

    const newTask = {
      ...request.body,
    };

    // const newTask = {
    //   topic: request.body.topic,
    //   nextSession: request.body.nextSession,
    // };
    const task = await Task.create(newTask);

    return response.status(201).send(task);
  } catch (error) {
    response
      .status(500)
      .send({ message: "Promblem creating a new task", error });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
