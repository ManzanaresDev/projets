// src/models/user.model.js

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

mongoose.set("strictQuery", true);

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate(v) {
        if (!validator.isEmail(v)) throw new Error("Email non valide");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(v) {
        if (!validator.isLength(v, { min: 4, ma: 20 }))
          throw new Error(
            "Le mot de passe doit contenir entre 4 et 20 caractères"
          );
      },
    },
    authTokens: [
      {
        authToken: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "users" }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.authTokens;
  delete user.__v;
  return user;
};

userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Error, connexion impossible");
  }
  const isPasswordValide = await bcrypt.compare(password, user.password);

  if (!isPasswordValide) {
    throw new Error("Error, connexion impossible");
  }
  return user;
};

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "foo");

  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

export const User = mongoose.model("User", userSchema);
