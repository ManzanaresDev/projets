//  models/user.model.js

import mongoose from "mongoose";
// Bibliothèque tokens
import {
  calculateExpirationDate,
  generateAccessToken,
  generateRefreshToken,
  hasher,
} from "../outils/token.outils.js";
import { saveUser } from "../outils/user.outils.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "undefined name",
    },
    first_name: {
      type: String,
      trim: true,
      default: "undefined first_name",
    },
    pseudo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

userSchema.methods.generateTokensAndSaveUser = async function () {
  // 1. Géneration de tokens (accesToken et refreshToken)

  const accessToken = generateAccessToken(this);
  const refreshToken = generateRefreshToken(this);
  // 2. Enregistrement du refreshToken après hashage. SECURITE ++
  const hashedRefreshToken = await hasher(refreshToken);
  this.set("refreshToken", hashedRefreshToken);
  await saveUser(this);
  // 3. renvoi du token
  return {
    accessToken,
    refreshToken,
  };
};

const User = mongoose.model("User", userSchema);

export default User;
