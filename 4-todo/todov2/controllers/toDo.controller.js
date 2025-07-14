// controllers/toDo.controller.js
import ToDoService from "../services/toDo.service.js";

async function createTask(req, res) {
  console.log("creating task...");

  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "Title et description are required to create the task",
      });
    }
    const userId = req.user;

    const newToDo = await ToDoService.createTask({
      title,
      description,
      userId,
    });

    return res
      .status(200)
      .json({ message: "task created successfully", task: newToDo });
  } catch (err) {
    console.error("Error at toDoController.create", err);
    res.status(500).json({ message: err.message });
  }
}

async function deleteTask(req, res) {
  const taskToDelete = req.params?.id;
  try {
    const deletedTask = await ToDoService.deleteTask(taskToDelete);
    if (!deletedTask) {
      return res.status(400).json({ message: "toDo not found" });
    }

    res
      .status(200)
      .json({ message: "toDo deleted successfully", task: deletedTask });
  } catch (err) {
    console.error("Error at toDoController.delete: ", err);
    res.status(500).json({ message: err.message });
  }
}

async function getAllTasks(req, res) {
  const userId = req.user;
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: user not identified" });
  }
  try {
    const allTasks = await ToDoService.getAllTasks(userId);
    return res
      .status(200)
      .json({ message: "task retrieved successfully", tasks: allTasks });
  } catch (err) {
    console.error("Error in toDoController.getAllTasks ", err);
    const statusCode = err.name === "MongoError" ? 500 : 400;
    return res.status(statusCode).json({ message: err.message });
  }
}

async function updateTask(req, res) {
  const taskIdToUpdate = req.params?.id;
  const taskBody = req.body;

  try {
    if (!taskIdToUpdate) {
      return res.status(400).json({ message: "task id is required" });
    }
    if (!taskBody) {
      return res.status(400).json({ message: "task body is required" });
    }
    const updatedTask = await ToDoService.updateTask(taskIdToUpdate, taskBody);
    return res
      .status(200)
      .json({ message: "task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Error in toDoController.updateTasks ", err);
    const statusCode = err.name === "MongoError" ? 500 : 400;
    return res.status(statusCode).json({ message: err.message });
  }
}

const toDoController = {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
};

export default toDoController;
