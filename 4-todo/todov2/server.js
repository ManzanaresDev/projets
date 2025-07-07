// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // <-- ton frontend
    credentials: true, // <-- autorise les cookies / headers d'auth
  })
);
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
