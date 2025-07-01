// backend/controllers/course.controller.js

import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Course from "../models//course.model.js";
import UserCourse from "../models/userCourse.model.js";
import {
  findCourseById,
  deleteCourse,
  getAllCourses,
  courseInUse,
  saveCourse,
} from "../outils/course.outils.js";
import { ValidateIsAdminFromRefreshToken } from "../outils/token.outils.js";
import { userExists } from "../outils/user.outils.js";
import { userCourseExists } from "../outils/userCourse.outils.js";

export const createCourseController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.files?.file?.[0];
    const logoFile = req.files?.logo?.[0];

    // Vérifie les champs et fichiers requis
    if (!title || !description || !file || !logoFile) {
      return res.status(400).json({
        ok: false,
        message: "Title, description, file, and logo are all required.",
      });
    }

    const newCourse = {
      title: title.trim(),
      description: description.trim(),
      file: file.filename,
      logo: logoFile.filename,
      createdAt: new Date(),
    };

    const savedCourse = await saveCourse(newCourse);

    // const savedCourse = await Course.create(newCourse);

    return res.status(201).json({
      ok: true,
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (error) {
    console.error("Error in createCourseController:", error);
    return res.status(500).json({
      ok: false,
      message: "Server error while creating course.",
    });
  }
};

// Téléchargement d'un cours (PDF)
export const downloadCourseController = async (req, res) => {
  try {
    // 1. Chercher l'utilisateur via le header Authorization (ici tu peux aussi utiliser req.user si tu veux)
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ ok: false, message: "Token requis ou format invalide" });
    }
    const token = authHeader.replace("Bearer ", "").trim();
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userFound = await userExists("_id", decodedToken._id);
    if (!userFound) {
      return res.status(400).json({ ok: false, message: "user not found" });
    }

    // 2. valider la présence du cours dans le paramètres
    if (!req.params.course) {
      return res.status(400).json({ ok: false, message: "Missing course" });
    }

    const courseId = req.params.course;

    // 3. Vérifier que l'utilisateur a bien souscrit ce course
    const downloadDroits = await userCourseExists(userFound._id, courseId);

    if (!downloadDroits) {
      // l'utilisateur n'a pas le droit au téléchargement du course
      return res
        .status(400)
        .json({ ok: false, message: "not rights to download this course" });
    }

    // l'utilisateur a le droits pour le téléchargement
    // Recherche du cours
    const course = await findCourseById(courseId);

    // 4. Préparation to téléchargement...
    // Sécurise l'entrée utilisateur pour éviter les accès non autorisés
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadFolder = process.env.UPLOADS_PATH || "uploads";
    const filename = course.file;
    const safePath = path.join(
      __dirname,
      "..",
      "..",
      uploadFolder,
      path.basename(filename)
    );

    res.download(safePath, filename, (err) => {
      if (err) {
        res
          .status(500)
          .send({ ok: false, message: "Erreur lors du téléchargement" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// Récupérer tous les cours
export const getAllCoursesController = async (req, res) => {
  try {
    const coursesList = await getAllCourses();
    res.status(200).json({
      ok: true,
      message: "courses gathering ok",
      courses: coursesList,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "server error",
      courses: [],
    });
  }
};

export const deleteCourseController = async (req, res) => {
  try {
    const courseId = req.params.id?.startsWith(":")
      ? req.params.id.slice(1).trim()
      : req.params.id.trim();

    if (!courseId) {
      return res.status(400).json({ ok: false, message: "Course ID required" });
    }

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ ok: false, message: "Token required" });
    }

    const { ok, status, message } = await ValidateIsAdminFromRefreshToken(
      refreshToken
    );

    if (!ok) {
      return res.status(status || 403).json({ ok, message });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ ok: false, message: "Invalid course ID" });
    }

    const isUsed = await courseInUse(courseId);

    if (isUsed) {
      return res.status(409).json({
        ok: false,
        message: "Cannot delete course: it is still assigned to users",
      });
    }

    await deleteCourse(courseId);

    return res
      .status(200)
      .json({ ok: true, message: "Course successfully deleted" });
  } catch (error) {
    console.error("Error in deleteCourseController:", error);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
