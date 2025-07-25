// backend/server.js

import express from "express";
import UserRouter from "./routes/user.routes.js";
import CoursRouter from "./routes/course.routes.js";
import UserCourseRouter from "./routes/userCourse.routes.js";
import authRouter from "./routes/auth.routes.js";
import createAdminUser from "./outils/createAdminUser.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sert les fichiers statiques du dossier /uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// 🌐 CORS config
const allowedOrigins = [
  "http://veilink.tech",
  "https://veilink.tech",
  "http://www.veilink.tech",
  "https://www.veilink.tech",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://cyber-g39b.onrender.com",
  "https://cyber-adk2.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS Origin reçu:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

// 🍪 Cookies & Body Parsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Fichiers uploadés
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// 📦 Connexion BDD + création admin
await connectDB();
await createAdminUser();

// 📚 Routes API
app.use("/user", UserRouter);
app.use("/course", CoursRouter);
app.use("/userCourse", UserCourseRouter);
app.use("/auth", authRouter);

// 🖼️ Serveur du frontend buildé
const frontendPath = path.join(__dirname, "..", "frontend", "dist");
console.log("📁 Frontend path:", frontendPath);
app.use(express.static(frontendPath));

// 🔁 Rediriger toutes les routes non API vers index.html
app.use((req, res, next) => {
  if (
    req.method === "GET" &&
    !req.path.startsWith("/api") &&
    !req.path.startsWith("/uploads") &&
    !req.path.includes(".") // évite d'intercepter les fichiers statiques
  ) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next(); // Laisse les erreurs 404 être gérées par Express
  }
});


// 🚀 Lancer le serveur
const port = process.env.BACKEND_PORT || 5000;
app.listen(port, () =>
  console.log("\x1b[32m%s\x1b[0m", `✅ Server running on http://localhost:${port}`)
);
