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

console.log("backend actif");

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND,
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "http://veilink.tech",
  "https://veilink.tech",
  "http://www.veilink.tech",
  "https://www.veilink.tech",
  "http://localhost:5173", // ← nécessaire pour ton dev local
  "http://127.0.0.1:5173", // ← parfois utile selon la config réseau
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Pour parser les JSON
app.use(express.json());
// Pour parser les formulaires (si tu envoies avec enctype=urlencoded)
app.use(express.urlencoded({ extended: true }));
// CORS pour les fichiers statiques
app.use(
  "/uploads",
  (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

const port = process.env.BACKEND_PORT || 5000;

// conexion à la BBDD
await connectDB();
// Création de l'utilisateur administrateur
await createAdminUser();

// Middlewares

// Permet d’accéder à tous les fichiers HTML dans le dossier front. utilisé pour la rédirection vers reset-password
app.use(express.static("../frontend"));
// permet d'acceder aux fichiers situés sur /uploads

// user routes
app.use("/user", UserRouter);
// cours routes
app.use("/course", CoursRouter);
// userCours routes
app.use("/userCourse", UserCourseRouter);
// Refresh token
app.use("/auth", authRouter);
// lancer le serveur on port 5000 et écouter sur toutes les interfaces ipV4 et IPv6
app.listen(5000, "::", () => {
  console.log("Backend listening on port 5000 (IPv4 & IPv6)");
});
