// routes/toDo.routes.js
import express from "express";
import toDoController from "../controllers/toDo.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const toDoRouter = express.Router();

toDoRouter.post("/create", authenticateToken, toDoController.createTask);
toDoRouter.delete("/delete/:id", authenticateToken, toDoController.deleteTask);
toDoRouter.get("/getAll", authenticateToken, toDoController.getAllTasks);
toDoRouter.post("/update/:id", authenticateToken, toDoController.updateTask);

export default toDoRouter;
