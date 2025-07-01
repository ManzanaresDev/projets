import mongoose from "mongoose";
import UserCourse from "../models/userCourse.model.js";

export async function getCoursesByUser(userId) {
  if (!userId) throw new Error("Missing user ID");

  const userCourses = await UserCourse.find({ user: userId })
    .populate("course") // récupère les objets complets Course
    .select("course actif status -_id"); // sélectionne seulement le champ course

  return userCourses;
}

/**
 * Checks if a user is already assigned to a course.
 * @param {string} user - The user ID.
 * @param {string} course - The course ID.
 * @returns {Promise<boolean>} True if the assignment exists, false otherwise.
 */
export async function userCourseExists(user, course) {
  if (!user || !course) {
    throw new Error("Missing user or course ID");
  }

  const ObjectId = mongoose.Types.ObjectId;

  if (ObjectId.isValid(user) && ObjectId.isValid(course)) {
    const result = await UserCourse.findOne({
      user: new ObjectId(user),
      course: new ObjectId(course),
    });

    return result !== null; // retourne true si trouvé, false sinon
  } else {
    return false;
  }
}

export async function saveUserCourse(user, course) {
  if (!user || !course) {
    throw new Error("Missing user or course ID");
  }
  return await UserCourse.create({
    user,
    course,
    createdAt: new Date(),
  });
}

// version optimisée de la fonction:
export async function toggleUserCourse(userId, courseId) {
  try {
    // On utilise $bit pour inverser le booléen actif (0->1 ou 1->0)
    const result = await UserCourse.findOneAndUpdate(
      { user: userId, course: courseId },
      [{ $set: { actif: { $not: "$actif" } } }], // Utilisation de l'aggregation pipeline pour inverser le booléen
      { new: true }
    );

    if (result.matchedCount === 0) {
      return {
        ok: false,
        message: "Relation user-course non trouvée. toggleUserCourse",
      };
    }

    return {
      ok: true,
      message: "Relation user-course activée/désactivée avec succès",
    };
  } catch (error) {
    console.error("Erreur dans toggleUserCourse :", error);
    return {
      ok: false,
      message: "Erreur lors du toggle de la relation user-course",
    };
  }
}
