//  models/course.model.js

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String, // URL ou chemin local du fichier PDF
    required: true,
  },
  logo: {
    type: String, // URL ou chemin local de l'image du logo
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
