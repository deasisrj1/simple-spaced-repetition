import cors from "cors";
import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import tasksRoute from "./routes/tasksRoute.js";
import todosRoute from "./routes/todosRoute.js";

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

app.use("/", tasksRoute);
app.use("/todo", todosRoute);

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
