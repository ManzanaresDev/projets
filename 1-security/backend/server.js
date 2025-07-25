// backend/server.js

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes et outils
import connectDB from "./config/db.js";
import createAdminUser from "./outils/createAdminUser.js";
import UserRouter from "./routes/user.routes.js";
import CoursRouter from "./routes/course.routes.js";
import UserCourseRouter from "./routes/userCourse.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔐 Cookies
app.use(cookieParser());

// 🔐 CORS autorisés
const allowedOrigins = [
  "http://veilink.tech",
  "https://veilink.tech",
  "http://www.veilink.tech",
  "https://www.veilink.tech",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://cyber-g39b.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🌐 CORS origin reçu:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// 📦 Middleware parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Fichiers uploadés accessibles
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// 🌐 Connexion à MongoDB
await connectDB();

// 👤 Création d’un admin au premier lancement
await createAdminUser();

// 🚀 Routes API
app.use("/user", UserRouter);
app.use("/course", CoursRouter);
app.use("/userCourse", UserCourseRouter);
app.use("/auth", authRouter);

// 🎯 Dossier du frontend (buildé avec Vite)
const frontendPath = path.resolve(__dirname, "..", "frontend", "dist");
console.log("📁 Static frontend path:", frontendPath);
app.use(express.static(frontendPath));

// ⚠️ Catch-all: redirige les routes non API vers React (SPA)
app.get("*", (req, res, next) => {
  if (
    !req.path.startsWith("/user") &&
    !req.path.startsWith("/course") &&
    !req.path.startsWith("/userCourse") &&
    !req.path.startsWith("/auth") &&
    !req.path.startsWith("/uploads") &&
    !req.path.includes(".")
  ) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next();
  }
});

// 🚦 Lancement du serveur
const port = process.env.BACKEND_PORT || 5000;
app.listen(port, () => {
  console.log("\x1b[32m%s\x1b[0m", `✅ Server running on http://localhost:${port}`);
});
