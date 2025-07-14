// middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export async function authenticateToken(req, res, next) {
  const token = req.cookies?.tokenAccess;

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const tokenUser = await User.findById(decoded.userId);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "user not found" });
    }

    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error(
      "JWT verification failed at middleware authenticateToken",
      err
    );
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
