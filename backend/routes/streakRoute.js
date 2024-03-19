import express from "express";
import { Streak } from "../models/streakModel.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const streak = await Streak.find({});

    return response.status(200).json({ data: streak[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

router.post("/", async (request, response) => {
  try {
    console.log(request.body);
    if (!("count" in request.body)) {
      return response.status(500).send({ message: "please provide count" });
    }

    const streak = await Streak.create({ count: request.body.count });

    return response.status(200).send(streak);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const _id = request.params.id;

    const streak = await Streak.findOne({ _id });

    if (!streak) {
      return response.status(404).send({ message: "cant find streak" });
    }

    streak.count += 1;

    await streak.save();

    return response.status(200).send(streak);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error });
  }
});

router.put("/reset/:id", async (request, response) => {
  try {
    const _id = request.params.id;

    const streak = await Streak.findOne({ _id });

    if (!streak) {
      return response.status(404).send({ message: "cant find streak" });
    }

    streak.count = 0;

    await streak.save();

    return response.status(200).send(streak);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error });
  }
});

export default router;
