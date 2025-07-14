import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZhNWYxMWY3NGEyZjQwMGZkYzUxYTgiLCJpYXQiOjE3NTE5NTgwMzIsImV4cCI6MTc1MjU2MjgzMn0.nI5sb3PzkQ-opQF2wasm5lmlvWQylsGHZ7UGlOdZyro";

try {
  const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
} catch (error) {
  console.error("Erreur jwt.verify:", error.message);
}
