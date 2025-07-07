// src/index.js
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/task.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cors from "cors";

dotenv.config();

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Adresse de frontend Vite
    credentials: true, // Permet l'envoi de cookies
  })
);

// Routes
app.use("/task", router);

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

// db connexion
await connectDB();

// Starting express
app.listen(app.get("port"), () => {
  console.log(`server running on http://localhost:${app.get("port")}`);
});
