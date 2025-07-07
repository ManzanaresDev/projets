// routes/user.route.js
import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);

export default router;
