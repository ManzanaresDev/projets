// src/routes/task.routes.js

import express from "express";
import Task from "../models/Task.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  console.log("tasks: ", tasks);

  res.json({
    status: "received",
    tasks,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      throw new Error();
    }

    const task = await Task.findById(taskId);

    return res.status(200).json({
      status: "ok",
      task,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      task: null,
    });
  }

  const tasks = await Task.findById(taskId);
  console.log("tasks: ", tasks);

  res.json({
    status: "received",
    tasks,
  });
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      status: "error",
      tasks: [],
    });
  }
  try {
    const task = new Task({
      title,
      description,
    });
    await task.save();

    return res.status(201).json({
      status: "ok",
      task,
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      status: "error saving task",
      tasks: [],
    });
  }

  res.json({
    status: "task saved",
    task,
  });
});

router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;

    if (!taskId) {
      throw new Error();
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        status: "error, task to update not found",
        task: [],
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "ok",
      task: updatedTask,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      tasks: [],
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      throw new Error();
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        status: "error, task to delete not found",
        task: null,
      });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      status: "ok",
      task: task,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      tasks: null,
    });
  }
});
