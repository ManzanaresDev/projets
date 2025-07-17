// controllers/userCourse.controller.js

import {
  userCourseExists,
  saveUserCourse,
  getCoursesByUser,
  toggleUserCourse,
} from "../outils/userCourse.outils.js";
import { userExists } from "../outils/user.outils.js";
import { ValidateIsAdminFromRefreshToken } from "../outils/token.outils.js";
import { getUserFromToken } from "../outils/token.outils.js";

export const createUserCourseController = async (req, res) => {
  try {
    const { user, course } = req.body;

    // Check if request body exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "Request body is missing or empty",
        data: [],
      });
    }

    // Validate required fields
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'Missing "user" field',
        data: [],
      });
    }

    if (!course) {
      return res.status(400).json({
        ok: false,
        message: 'Missing "course" field',
        data: [],
      });
    }

    // Check if the assignment already exists
    const existingAsignement = await userCourseExists(user, course);
    if (existingAsignement) {
      return res.status(409).json({
        ok: false,
        message: "User is already assigned to this course",
        data: [],
      });
    }

    // Create the assignment
    const newUserCourse = await saveUserCourse(user, course);

    return res.status(201).json({
      ok: true,
      message: "Course assignment successfully saved",
      data: newUserCourse,
    });
  } catch (error) {
    console.error("Error while creating course assignment:", error);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
      data: [],
    });
  }
};

// Récupérer les cours d'un utilisateur
export const getUserCoursesController = async (req, res) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "unknown user",
      user: null,
    });
  }

  const userId = await getUserFromToken(token);

  if (!userId) {
    return res.status(403).json({
      ok: false,
      message: "unknown user",
      data: [],
    });
  }

  try {
    const user = await userExists("_id", userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Utilisateur non trouvé",
        data: [],
      });
    }

    const userCourses = await getCoursesByUser(userId);

    return res.status(200).json({
      ok: true,
      data: userCourses,
    });
  } catch (error) {
    console.error("Erreur dans getUserCoursesController:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Erreur interne du serveur",
      data: [],
    });
  }
};

export const toggleUserCourseController = async (req, res) => {
  const { userId, courseId } = req.body;

  // Vérification des paramètres
  if (!userId || !courseId) {
    return res
      .status(400)
      .json({ ok: false, message: "UserId and CourseId are required" });
  }

  // Vérification du token
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ ok: false, message: "Token required" });
  }

  const refreshToken = req.cookies.refreshToken;

  try {
    const { ok, status, message } = await ValidateIsAdminFromRefreshToken(
      refreshToken
    );

    // Si le token n'est pas valide
    if (!ok) {
      return res.status(status).json({ ok, message });
    }

    // Vérifie si la relation user-course existe
    const relationExists = await userCourseExists(userId, courseId);

    if (!relationExists) {
      return res.status(404).json({
        ok: false,
        message:
          "Relation user-course non trouvée - toggleUserCourseController",
      });
    }

    // Toggle la relation
    const toggleResult = await toggleUserCourse(userId, courseId);

    return res.status(200).json({
      ok: toggleResult.ok,
      message: toggleResult.message,
    });
  } catch (error) {
    console.error("Erreur dans toggleUserCourseController :", error);
    return res.status(500).json({ ok: false, message: "Erreur serveur" });
  }
};
