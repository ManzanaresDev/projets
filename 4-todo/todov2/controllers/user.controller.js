// controllers/user.controller.js

import UserService from "../services/user.service.js";

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
    const { user, tokenAccess } = await UserService.login(userData);

    res.cookie("tokenAccess", tokenAccess, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "Strict",
      sameSite: "None",
      maxAge: 15 * 60 * 1000, // 15 mins
      path: "/",
    });
    res.status(200).json({ message: "User login successfully", user: user });
  } catch (err) {
    console.error(err);
    if (err.message === "Server error") {
      return res.status(500).json({ message: err.message });
    }
    return res.status(400).json({ message: err.message });
  }
}

async function logout(req, res) {
  res.clearCookie("tokenAccess", {
    httpOnly: true, // accessible via JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    path: "/",
  });
  res.status(200).json({ message: "user logout successfully" });
}

async function me(req, res) {
  try {
    const token = req.cookies.tokenAccess;
    if (!token) {
      return res.status(401).send();
    }

    const userInfo = await UserService.me(token);

    res.status(200).send(userInfo);
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
  logout,
  me,
};

export default UserController;
