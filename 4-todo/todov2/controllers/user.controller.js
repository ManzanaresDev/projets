// controllers/user.controller.js

import UserService from "../services/user.service.js";
import jwt from "jsonwebtoken";

async function register(req, res) {
  const userData = req.body;
  try {
    const newUser = await UserService.register(userData);
    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (err) {
    console.error(err);
    if (err.message === "Server error") {
      return res.status(500).json({ message: error.message });
    }

    return res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  const { userName, password } = req.body;
  try {
    const userData = req.body;
    const { userLogin, tokenAccess, tokenRefresh } = await UserService.login(
      userData
    );
    res.cookie("tokenAccess", tokenAccess, {
      httpOnly: false, // accessible via JS
      secure: true,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 mins
    });
    res.cookie("tokenRefresh", tokenRefresh, {
      httpOnly: true, // innaccessible via JS
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 1000, // 7 jours
    });
    res
      .status(200)
      .json({ message: "User login successfully", user: userLogin });
  } catch (err) {
    console.error(err);
    if (err.message === "Server error") {
      return res.status(500).json({ message: error.message });
    }

    return res.status(400).json({ message: err.message });
  }
}

const UserController = {
  register,
  login,
};

export default UserController;
