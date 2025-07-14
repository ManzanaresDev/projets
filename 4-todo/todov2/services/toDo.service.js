// services.toDo.service.js

import ToDo from "../models/ToDo.model.js";

async function createTask(task) {
  console.log("creating task - service web");

  const { title, description, userId } = task;

  if (!title || !description || !userId) {
    throw new Error("All fields are required");
  }

  const existingTask = await ToDo.findOne({ title });
  if (existingTask) {
    throw new Error("task already exists");
  }

  const isCompleted = false;
  const createdBy = userId;

  const newToDo = {
    title,
    description,
    isCompleted,
    createdBy,
  };

  try {
    const newTask = new ToDo(newToDo);
    await newTask.save();
    return newTask;
  } catch (err) {
    console.error("Error at ToDoService.Create: ", err);
    throw new Error(`Error creating task: ${err.message}`);
  }
}

async function deleteTask(taskId) {
  if (!taskId) {
    throw new Error("task to delete not defined");
  }

  try {
    const deletedTask = await ToDo.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new Error("task not found");
    }
    return deletedTask;
  } catch (err) {
    console.error("Error at ToDoService.Delete: ", err);
    throw new Error(`Error deleting task: ${err.message}`);
  }

  return {};
}

async function getAllTasks(userId) {
  const allTasks = await ToDo.find({ createdBy: userId }).sort({
    createdAt: -1, //de plus récent au plus ancien
  });

  return allTasks;
}

async function updateTask(taskId, taskBody) {
  if (!taskId || !taskBody) {
    throw new Error("task id or task body are required");
  }
  const updatedTask = await ToDo.findByIdAndUpdate(taskId, taskBody, {
    new: true,
    runValidators: true,
  });
  if (!updateTask) {
    throw new Error("task not found");
  }

  return updatedTask;
}

const ToDoService = {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
};

export default ToDoService;
