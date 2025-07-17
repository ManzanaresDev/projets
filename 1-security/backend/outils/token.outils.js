//  backend/outils/tokenOutils.js

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// pour la géneration d'un secure random string ideal for token temporaire: crypto.randomBytes(32).toString('hex'). Token pour demande de réinitialisation d'email
import crypto from "crypto";
import { userExists } from "../outils/user.outils.js";

export async function genererRandomToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function generateAccessToken(user) {
  if (!user || !user._id || !user.role) {
    throw Error("Invalid user object");
  }

  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
}

export function generateRefreshToken(user) {
  if (!user || !user._id || !user.role) {
    throw Error("invalid user object");
  }

  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN }
  );
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

export async function hasher(element) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(element, salt);
}

export function calculateExpirationDate(offset) {
  return new Date(new Date(Date.now() + Number(offset)));
}

export async function compareTokens(token1, token2) {
  return await bcrypt.compare(token1, token2);
}

export function tokenIsExpired(expDate) {
  return new Date() > new Date(expDate); // Vrai si le token est expiré
}

export function tokenIsValid(token, secret) {
  try {
    payload = jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
}

// export async function ValidateIsAdminFromRefreshToken(token) {
//   // 1. Vérification du token
//   if (!token) {
//     return {
//       ok: false,
//       status: 401,
//       message: "Refresh token missing",
//     };
//   }

//   let decodedPayload;
//   try {
//     //2. Décodification du refreshToken et comprobation de validité
//     decodedPayload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
//   } catch (err) {
//     return {
//       ok: false,
//       status: 403,
//       message: "Invalid or expired refresh token",
//     };
//   }
//   // 3. Seule l'administrateur a des droits d'accès
//   // if (!decodedPayload.role === "admin") {
//   if (decodedPayload.role !== "admin") // faux même si role = "admin"
//     return {
//       ok: false,
//       status: 401,
//       message: "operation restricted to administrator",
//     };
//   }
//   //4. Récuperation de refreshToken du propiétaire
//   const user = await userExists("_id", decodedPayload._id);

//   if (!user || !user.refreshToken) {
//     return {
//       ok: false,
//       status: 404,
//       message: "User or token not found",
//     };
//   }
//   //5. Validation entre les deux tokens (cookie et utilisateur). SECURITE ++
//   const isTokenValid = await compareTokens(token, user.refreshToken);
//   if (!isTokenValid) {
//     return {
//       ok: false,
//       status: 403,
//       message: "Refresh token does not match",
//     };
//   }
//   return {
//     ok: true,
//     status: 200,
//     message: "user is admin",
//   };
// }
export async function ValidateIsAdminFromRefreshToken(token) {
  // 1. Vérification du token
  if (!token) {
    return {
      ok: false,
      status: 401,
      message: "Refresh token missing",
    };
  }

  let decodedPayload;
  try {
    // 2. Décodification du refreshToken et vérification de validité
    decodedPayload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return {
      ok: false,
      status: 403,
      message: "Invalid or expired refresh token",
    };
  }

  // 3. Seul l'administrateur a des droits d'accès
  if (decodedPayload.role !== "admin") {
    return {
      ok: false,
      status: 401,
      message: "Operation restricted to administrator",
    };
  }

  // 4. Récupération de l'utilisateur propriétaire du token
  const user = await userExists("_id", decodedPayload._id);

  if (!user || !user.refreshToken) {
    return {
      ok: false,
      status: 404,
      message: "User or token not found",
    };
  }

  // 5. Validation entre les deux tokens (cookie et utilisateur) - Sécurité renforcée
  const isTokenValid = await compareTokens(token, user.refreshToken);
  if (!isTokenValid) {
    return {
      ok: false,
      status: 403,
      message: "Refresh token does not match",
    };
  }

  // Tout est OK
  return {
    ok: true,
    status: 200,
    message: "User is admin",
  };
}

export async function getUserFromToken(token) {
  let decodedPayload;
  try {
    decodedPayload = verifyToken(token, process.env.JWT_SECRET);
    return decodedPayload._id;
  } catch (err) {
    return null;
  }
}
