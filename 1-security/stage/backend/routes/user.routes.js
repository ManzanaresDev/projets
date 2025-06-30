// backend/routes/user.routes.js
import express from "express";
import {
  signInController,
  registerController,
  logoutController,
  forgottenPasswordUserController,
  resetUserPasswordQuestionController,
  resetUserPasswordManagementController,
  userInfoController,
  saveUserInfoController,
  deleteUserController,
  getAllUsersController,
  getUserCoursesController,
} from "../controllers/user.controller.js";
// middleware pour la vérification d'authentification
import { verifyAuthentification } from "../middleware/authentification.middleware.js";

const router = express.Router();

// ROUTES PUBLIQUES ***********************************************
router.get("/", (req, res) => {
  res.status(200).json({ message: "user routes from back server" });
});
// endpoint pour le signin de l'utilisateur
router.post("/signin", signInController);
// endpoint pour la création d'un utilisateur
router.post("/register", registerController);
// endpoint pour demander la réinitialisation du mot de passe
router.post("/forgot-password", forgottenPasswordUserController);
// endpoint pour réinitialiser le mot de passe
router.get("/reset-password", resetUserPasswordQuestionController);
// endpoint pour mettre à jour le nouveau mot de passe
router.post("/reset-password", resetUserPasswordManagementController);
// ROUTES PUBLIQUES ***********************************************

// ROUTES PROTEGEES ***********************************************
router.post("/logout", verifyAuthentification, logoutController);
router.get("/me", verifyAuthentification, userInfoController);
router.patch("/saveInfo", verifyAuthentification, saveUserInfoController);
router.delete("/delete/:id", verifyAuthentification, deleteUserController);
router.get("/users", verifyAuthentification, getAllUsersController);
router.get("/courses/:id", verifyAuthentification, getUserCoursesController);
// ROUTES PROTEGEES ***********************************************

export default router;
