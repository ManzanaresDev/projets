// backend/services/user.service.js

import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
async function login({ userName, password }) {
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

  const tokenAccess = jwt.sign({ userId: user._id }, secretKeyAccess, {
    expiresIn: "15m",
  });

  const userData = {
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return {
    user: userData,
    tokenAccess,
  };
}

async function me(token) {
  try {
    const secretKeyAccess = process.env.JWT_SECRET;
    token = token.trim();

    const decoded = jwt.verify(token, secretKeyAccess);

    if (!decoded || !decoded?.userId) {
      throw new Error("token invalid");
    }

    const foundUser = await User.findOne({ _id: decoded.userId }).select(
      "userName firstName lastName"
    );
    if (!foundUser) {
      throw new Error("user not found");
    }
    return {
      userName: foundUser.userName,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    };
  } catch (err) {
    console.error("Erreur dans UserService.me", err.message);
    throw new Error(err.message);
  }
}

const UserService = {
  register,
  login,
  me,
};

export default UserService;
