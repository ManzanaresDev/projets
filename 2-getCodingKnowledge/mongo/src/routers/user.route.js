// mongo/src/routes/user.route.js

import express from "express";
import { User } from "../models/user.model.js";
import { authentification } from "../middlewares/authentification.middleware.js";

export const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(201).send({ user, authToken });
  } catch (e) {
    res.status(400).send(e);
  }
});

userRouter.get("/users/me", authentification, async (req, res, next) => {
  res.status(200).send(req.user);
});

userRouter.patch("/users/me", authentification, async (req, res, next) => {
  const updatedInfo = Object.keys(req.body);
  try {
    console.log("user before: ", req.user);
    updatedInfo.forEach((update) => (req.user[update] = req.body[update]));
    console.log("user after: ", req.user);
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.delete("/users/me", authentification, async (req, res, next) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.post("/users/login", async (req, res, next) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (e) {
    res.status(400).send(`Error: ${e}`);
  }
});

userRouter.post("/users/logout", authentification, async (req, res, next) => {
  try {
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken != req.authToken;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

userRouter.post(
  "/users/logout/all",
  authentification,
  async (req, res, next) => {
    try {
      req.user.authTokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  }
);
