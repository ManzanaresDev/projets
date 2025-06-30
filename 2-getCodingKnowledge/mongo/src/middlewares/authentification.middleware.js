// mongo/src/middleware/authentification.middleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authentification = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("En-tête manquant ou mal formé");
    }

    const authToken = authHeader.replace("Bearer ", "");
    const decodedToken = jwt.verify(authToken, "foo");
    const user = await User.findOne({
      _id: decodedToken._id,
      "authTokens.authToken": authToken,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.authToken = authToken;

    next();
  } catch (e) {
    res.status(401).send("Merci de s'authentifier");
  }
};
