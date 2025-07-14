// controllers/user.controller.js

import User from "../models/user.model.js";
import mongoose from "mongoose";
import { ValidateIsAdminFromRefreshToken } from "../outils/token.outils.js";
import nodemailer from "nodemailer";
import {
  userExists,
  comparerPassword,
  userIsAdmin,
  saveUser,
  updateUser,
  getAllUsers,
} from "../outils/user.outils.js";
import {
  calculateExpirationDate,
  genererRandomToken,
  tokenIsExpired,
  verifyToken,
  hasher,
} from "../outils/token.outils.js";
import { getCoursesByUser } from "../outils/userCourse.outils.js";

export const forgottenPasswordUserController = async (req, res) => {
  // Configuration du transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SYS_EMAIL,
      pass: process.env.SYS_PASSWORD,
    },
  });

  try {
    // 0. Valider les données envoyées dans la requête
    if (!req.body.email) {
      return res
        .status(400)
        .json({ ok: false, message: "user email required" });
    }

    const { email } = req.body || {};

    // 1. Vérifier que l'utilisateur existe bien dans la base de données
    const user = await userExists("email", email);

    if (!user) {
      return res.status(404).json({ ok: false, message: "user not found" });
    }

    // 2. Générer un token sécurisé et le stocker avec l'utilisateur dans la base de données
    const token = await genererRandomToken();

    // Récupérer le temps d'expiration du token (par défaut 1 heure)
    const rawLifetime = process.env.EMAIL_RESET_TOKEN_LIFETIME || 3600000;
    const lifetime = parseInt(rawLifetime, 10);
    const expires = isNaN(lifetime)
      ? calculateExpirationDate("3600000")
      : calculateExpirationDate(lifetime);

    await updateUser(
      "email",
      email,
      null,
      {},
      { resetPasswordToken: token, resetPasswordTokenExpires: expires }
    );

    // 3. Créer le lien de réinitialisation du mot de passe et l'envoyer à l'utilisateur
    const passwordResetLink = `${process.env.FRONTEND}/reset-password2?token=${token}`;

    // 4. Configuration du mail
    const mailOptions = {
      from: process.env.SYS_EMAIL,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
             <a href="${passwordResetLink}">Réinitialiser mon mot de passe</a>`,
    };

    // 5. Envoyer l'email avec async/await pour un meilleur contrôle
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      ok: true,
      message: "Email de réinitialisation envoyé avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    return res.status(500).json({
      ok: false,
      message: "Erreur serveur lors de l'envoi de l'email de réinitialisation.",
      error: error.message,
    });
  }
};

// Réception du nouveau mot de passe et mise à jour des données de l'utilisateur
export const resetUserPasswordManagementController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // 0. Validation des données reçues
    if (!token) {
      return res.status(400).json({ ok: false, message: "Token required" });
    }
    // 0. Validation du reset token
    const userResetToken = await userExists("resetPasswordToken", token);
    const expired = tokenIsExpired(userResetToken.resetPasswordTokenExpires); //aqui

    if (expired) {
      return res
        .status(403)
        .json({ ok: false, message: "Invalid or expired token" });
    }
    // 0. Validation des données reçues
    if (!newPassword) {
      return res.status(400).json({ ok: false, message: "Password required" });
    }

    // 1. Recherche de l'utilisateur par token
    const existingUser = await userExists("resetPasswordToken", token);

    if (!existingUser) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    const { email } = existingUser;

    // 2. Mise à jour du mot de passe et suppression des champs temporaires
    await updateUser("email", email, newPassword, {
      resetPasswordToken: true,
      resetPasswordTokenExpires: true,
    });

    // 3. Réponse OK
    res.status(200).json({ ok: true, message: "Reset password successful" });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const resetUserPasswordQuestionController = async (req, res) => {
  try {
    // 1. Récuperation du token
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        ok: false,
        message: "Token error",
      });
    }

    // 2. Recherche de l'utilisateur avec le token
    const user = await userExists("resetPasswordToken", token);
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "User not found",
      });
    }

    // 3. Vérification de l'expiration du token
    if (tokenIsExpired(user.resetPasswordTokenExpires)) {
      return res.status(400).json({
        ok: false,
        message: "Expired token",
      });
    }

    // 4. Redirection vers la page de réinitialisation (front-end)
    return res.redirect(
      302,
      `${process.env.FRONTEND}/reset-password2?token=${token}`
    );
  } catch (error) {
    console.error("Erreur dans resetUserPasswordQuestionController:", error);
    return res.status(500).json({
      ok: false,
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

export const signInController = async (req, res) => {
  const { pseudo, password } = req.body;

  // Validation basique (à remplacer idéalement par Joi/Zod)
  if (!pseudo || !password) {
    return res
      .status(400)
      .json({ ok: false, message: "Pseudo and password are required" });
  }

  try {
    // 1. Vérification si l'utilisateur existe
    const user = await userExists("pseudo", pseudo);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    // 2. Vérification du mot de passe
    const passwordIsValid = await comparerPassword(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ ok: false, message: "Incorrect password" });
    }

    // 3. Création et enregistrement des tokens
    const { accessToken, refreshToken } =
      await user.generateTokensAndSaveUser();

    // Nettoyage de l'objet utilisateur
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Définir le cookie pour retourner le refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true si HTTPS
      sameSite: "Lax", // autorise les cookies même entre localhost:5000 et localhost:5173
      maxAge: Number(process.env.COOKIE_LIFETIME) || 7 * 24 * 60 * 60 * 1000, //7d par default
    });

    // SECURITE ++
    res.cookie("accessToken", accessToken, {
      httpOnly: false, // pour pouvoir acceder au cookie depuis js
      secure: false, // true si HTTPS
      sameSite: "Lax", // autorise les cookies même entre localhost:5000 et localhost:5173
      maxAge: Number(process.env.COOKIE_LIFETIME) || 7 * 24 * 60 * 60 * 1000, //7d par default
    });

    res.status(200).json({
      ok: true,
      message: "User connected successfully",
      user: userWithoutPassword,
      // authToken: accessToken,
      isAdmin: userIsAdmin(user.role),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Création du compte de l'utilisateur
export const registerController = async (req, res) => {
  try {
    const { user } = req.body;

    // Validation du payload
    if (!user) {
      return res.status(400).json({ message: "Missing user" });
    }

    const { pseudo, password } = user;

    if (!pseudo || !password) {
      return res
        .status(400)
        .json({ message: "pseudo and password are required" });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await userExists("pseudo", pseudo);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // 409 = conflict
    }

    // Hash du mot de passe
    const hashedPassword = await hasher(password);

    // Création du nouvel utilisateur
    const newUser = new User({
      ...user,
      password: hashedPassword,
    });

    // Sauvegarde en base
    await saveUser(newUser);

    // Nettoyage avant envoi (pas de mot de passe)
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    // on ne renvoie pas de cookie avec refreshtoken parce que on est renvoyé
    // vers la page de login
    return res.status(201).json({
      ok: true,
      message: "User created successfully.",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Erreur lors de l’enregistrement utilisateur:", err);
    return res.status(500).json({
      ok: false,
      message: "User creation failed",
      error: err.message,
    });
  }
};

// Déconnexion
export const logoutController = async (req, res) => {
  try {
    const accessToken = req.cookies?.accessToken;

    // ✅ Pas de token → déjà déconnecté (204 No Content sans message inutile)
    if (!accessToken) {
      return res.sendStatus(204);
    }

    // ✅ Vérification de validité du token
    let decoded;
    try {
      decoded = verifyToken(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        ok: false,
        message: "Invalid or expired access token",
      });
    }

    // ✅ Vérifie si l'utilisateur existe
    const user = await userExists("_id", decoded._id);
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Unknown user",
      });
    }

    // ✅ Supprime le refreshToken stocké côté serveur (DB)
    await updateUser("_id", decoded._id, null, { refreshToken: true }, {});

    // ✅ Supprime les cookies côté client
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // change en true en production avec HTTPS
      sameSite: "Lax",
    });

    res.clearCookie("accessToken", {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(200).json({
      ok: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Logout error",
      error: error.message,
    });
  }
};

// retourns user info
export const userInfoController = async (req, res) => {
  try {
    // 1. Récupérer le token d'accès depuis les cookies
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        ok: false,
        message: "Access token required",
      });
    }
    // 2. Vérifier et décoder le token
    let decoded;
    try {
      decoded = verifyToken(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        ok: false,
        message: "invalid or expired token",
      });
    }
    // 3. Vérifier si l'utilisateur existe
    const user = await userExists("_id", decoded._id);
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "unknown user",
      });
    }
    // 4. Retourner les infos de l'utilisateur
    const { name, first_name, email, phone, address, pseudo, _id } = user;

    return res.status(200).json({
      ok: true,
      user: {
        name,
        first_name,
        email,
        phone,
        address,
        pseudo,
        _id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const saveUserInfoController = async (req, res) => {
  try {
    // 1. Récuperer les données à sauvegarder
    const { name, first_name, email, phone, address } = req.body;
    if (!name || !first_name || !email || !phone || !address) {
      return res.status(400).json({ ok: false, message: "field required" });
    }

    // 2. Récupérer le token d'accès depuis les cookies pour identifier l'utilisateur à mettre à jour
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        ok: false,
        message: "Access token required",
      });
    }
    // 3. Vérifier et décoder le token
    let decoded;
    try {
      decoded = verifyToken(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        ok: false,
        message: "invalid or expired token",
      });
    }
    // 4. Vérifier si l'utilisateur existe
    const user = await userExists("_id", decoded._id);
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "unknown user",
      });
    }

    // 5. Mettre à jour l'utilisateur
    await updateUser(
      "_id",
      user._id, // ou user.mail, ou user.pseudo tous les trois sont uniques
      null,
      {},
      { name, first_name, email, phone, address }
    );
    return res.status(200).json({
      ok: true,
      message: "user update successful",
      user: {
        name,
        first_name,
        email,
        phone,
        address,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// export const deleteUserController = async (req, res) => {
//   if (!req.params.id) {
//     throw new Error("user to delete required");
//   }
//   const userToDelete = req.params.id;

//   if (!req.cookies.refreshToken) {
//     return res.status(401).json({ ok: false, message: "Token required" });
//   }
//   const refreshToken = req.cookies.refreshToken;

//   const { ok, status, message } = await ValidateIsAdminFromRefreshToken(
//     refreshToken
//   );

//   if (!ok) {
//     return {
//       ok,
//       status,
//       message,
//     };
//   }
//   // Seulement l'administrateur peut supprimer des utilisateurs
//   // Extraire info du token
//   try {
//     const ObjectId = mongoose.Types.ObjectId;

//     const cleanUserToDelete = cleanUserToDelete.startsWith(":")
//       ? cleanUserToDelete.slice(1).trim()
//       : cleanUserToDelete.trim();

//     const id = new mongoose.Types.ObjectId(cleanUserToDelete);
//     const result = await User.deleteOne({ _id: id });

//     res.status(status).json({ ok, message });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: "server error" });
//   }
// };
export const deleteUserController = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ ok: false, message: "User ID required" });
  }

  const userToDelete = req.params.id;
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ ok: false, message: "Token required" });
  }

  // Validation admin via refreshToken
  const { ok, status, message } = await ValidateIsAdminFromRefreshToken(
    refreshToken
  );

  if (!ok) {
    return res.status(status).json({ ok, message });
  }

  try {
    // Validation ObjectId
    if (!mongoose.Types.ObjectId.isValid(userToDelete)) {
      return res.status(400).json({ ok: false, message: "Invalid user ID" });
    }

    const id = new mongoose.Types.ObjectId(userToDelete);
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("deleteUserController error:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Server error", error: error.message });
  }
};

// Récupérer tous les cours
export const getAllUsersController = async (req, res) => {
  try {
    const usersList = await getAllUsers();
    res.status(200).json({
      ok: true,
      message: "users gathering ok",
      users: usersList,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "server error",
      users: [],
    });
  }
};

export const getUserCoursesController = async (req, res) => {
  if (!req.params.id) {
    throw new Error("user required");
  }
  const userToFetchCourses = req.params.id;

  if (!req.cookies.refreshToken) {
    return res.status(401).json({ ok: false, message: "Token required" });
  }
  const refreshToken = req.cookies.refreshToken;

  const { ok, status, message } = await ValidateIsAdminFromRefreshToken(
    refreshToken
  );

  if (!ok) {
    return {
      ok,
      status,
      message,
    };
  }

  try {
    const userCoursesList = await getCoursesByUser(userToFetchCourses);
    res.status(200).json({
      ok: true,
      message: "users courses gathering ok",
      data: userCoursesList,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "server error",
      data: [],
    });
  }
};
