// services/user.service.js

import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// Inscription
async function register(userData) {
  const { userName, firstName, lastName, password } = userData;

  if (!userName || !firstName || !lastName || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = new User({ userName, firstName, lastName, password });
  await newUser.save();

  return newUser;
}

// Connexion
export async function login({ userName, password }) {
  if (!userName || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ userName });
  if (!user) {
    throw new Error("Authentication failed: user not found");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Authentication failed: wrong password");
  }

  // Génération des tokens
  const secretKeyAccess = process.env.JWT_SECRET;
  const secretKeyRefresh = process.env.JWT_REFRESH_SECRET;

  if (!secretKeyAccess || !secretKeyRefresh) {
    throw new Error("JWT secrets are not defined");
  }

  const tokenAccess = jwt.sign({ userId: user._id }, secretKeyAccess, {
    expiresIn: "15m",
  });

  const tokenRefresh = jwt.sign({ userId: user._id }, secretKeyRefresh, {
    expiresIn: "7d",
  });

  const userData = {
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return {
    user: userData,
    tokenAccess,
    tokenRefresh,
  };
}

const UserService = {
  register,
  login,
};

export default UserService;
