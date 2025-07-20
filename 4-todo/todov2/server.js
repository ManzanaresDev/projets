// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import toDoRoutes from "./routes/toDo.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: "https://todov2-frontend.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRoutes);
app.use("/api/todo", toDoRoutes);

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running`);
});
