// backend/outils/course.outils.js

import mongoose from "mongoose";
import Course from "../models/course.model.js";

export async function saveCourse(course) {
  return await Course.create(course);
}

export async function findCourseById(courseId) {
  if (!courseId) throw new Error("Missing course ID");

  const course = Course.findOne({ _id: courseId });
  return course;
}

export async function getAllCourses() {
  try {
    const courses = await Course.find();
    return courses;
  } catch {
    return [];
  }
}

// Récupérer un cours par ID (fonction utilitaire)
export async function getCoursebyId(courseId) {
  try {
    const course = Course.findOne({ _id: courseId });

    if (!course) return [];
    else return course;
  } catch (error) {
    return [];
  }
}

export async function courseInUse(courseId) {
  try {
    // Seulement on peux supprimer un cours s'il n'est pas affecté à aucun utilisateur
    const { ObjectId } = mongoose.Types;
    const result = await UserCourse.findOne({
      course: new ObjectId(courseId),
    });
    return result === null;
  } catch (error) {
    return false;
  }

  return true;
}

export async function deleteCourse(course) {
  await Course.deleteOne({
    _id: new mongoose.Types.ObjectId(course),
  });
}
