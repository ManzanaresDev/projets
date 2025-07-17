import mongoose, { model, Schema } from "mongoose";

// Définition de l'enum des statuts possibles
const TypeStatus = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

const userCourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    actif: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: Object.values(TypeStatus),
      default: TypeStatus.IN_PROGRESS,
    },
  },
  {
    timestamps: true,
  }
);

const UserCourse = model("UserCourse", userCourseSchema);

export default UserCourse;
