import cors from "cors";
import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Task } from "./models/taskModel.js";

const app = express();

app.use(express.json());

// Middleware for handling CORS POLICY
// OPTION1: allow all origins with default of cors(*)
app.use(cors());
/* OPTION2: allow custom origins
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowHeaders: ["Content-Type"]
    })
  )
*/
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

app.get("/todays-task", async (request, response) => {
  const todaysDate = new Date();
  try {
    const tasks = await Task.find({
      date: { $lte: todaysDate },
    });
    return response.status(201).send({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send({ message: "Problem getting today's tasks", error });
  }
});

app.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Task.findOneAndDelete({
      _id: id,
    });

    if (!result) {
      return response.status(404).json({ message: "could not fine Task" });
    }

    return response
      .status(200)
      .json({ message: "Task was deleted successfully!" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
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
