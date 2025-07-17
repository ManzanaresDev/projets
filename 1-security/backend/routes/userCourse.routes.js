// backend/routes/userCourse.routes.js

import express from "express";
// middleware pour la vérification d'authentification
import { verifyAuthentification } from "../middleware/authentification.middleware.js";
import {
  createUserCourseController,
  getUserCoursesController,
  toggleUserCourseController,
} from "../controllers/userCourse.controller.js";

const router = express.Router();

// ROUTES PUBLIQUES ***********************************************
router.get("/courses", getUserCoursesController);
// ROUTES PUBLIQUES ***********************************************

// ROUTES PRIVES ***********************************************
// endpoint pour la création d'un userCourse
router.post(
  "/create",
  verifyAuthentification, // middleware d'authorisation d'accès
  createUserCourseController
);
router.patch("/toggle", verifyAuthentification, toggleUserCourseController);
// ROUTES PRIVES ***********************************************

export default router;
