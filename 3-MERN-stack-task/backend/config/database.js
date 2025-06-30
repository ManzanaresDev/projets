// src/database.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connexion successfully!");
  } catch (e) {
    console.error("DB connexion failed!");
    console.log(e);
    process.exit(1);
  }
};
