// routes/user.route.js
import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

// routes d'authentification
router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);
router.post("/auth/logout", UserController.logout);
// routes d'utilisateur
router.get("/me", UserController.me);

export default router;
