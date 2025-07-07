// config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.BD_URI);
    console.log("Connexion MongoDB établie");
  } catch (e) {
    console.error("Echec de connexion MongoDB");
    process.exit(1);
  }
};
