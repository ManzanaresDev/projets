// backend/routes/course.routes.js

import express from "express";
import {
  createCourseController,
  downloadCourseController,
  getAllCoursesController,
  deleteCourseController,
} from "../controllers/course.controller.js";
import { verifyAuthentification } from "../middleware/authentification.middleware.js";
import { configurationStorage } from "../middleware/upload.middleware.js"; // Si tu veux utiliser ton propre middleware pour multer

const router = express.Router();

// Utilisation de la configuration de multer personnalisée
const upload = configurationStorage(); // Utiliser ta propre configuration pour le stockage des fichiers

// ROUTES PRIVES ***********************************************
router.post(
  "/create",
  upload.fields([
    { name: "file", maxCount: 1 }, // Le fichier PDF
    { name: "logo", maxCount: 1 }, // Le logo de l'image
  ]),
  verifyAuthentification, // middleware de vérification de l'authentification
  createCourseController
);
router.delete("/:course", verifyAuthentification, deleteCourseController);

// router.get("/user/:pseudo", verifyAuthentification, getUserCoursesController);
router.get(
  "/download/:course",
  verifyAuthentification,
  downloadCourseController
);
router.delete("/delete/:id", verifyAuthentification, deleteCourseController);
// ROUTES PRIVES ***********************************************

// ROUTES PUBLIQUES ***********************************************
router.get("/courses", getAllCoursesController);
// ROUTES PUBLIQUES ***********************************************

export default router;
