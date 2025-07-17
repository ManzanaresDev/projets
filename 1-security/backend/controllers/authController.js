//  /controllers/authController.js

import User from "../models/user.model.js";
// Bibliothèque user
import { userExists, saveUser } from "../outils/user.outils.js";
import {
  calculateExpirationDate,
  hasher,
  compareTokens,
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} from "../outils/token.outils.js";

export const refreshTokenController = async (req, res) => {
  try {
    // 1. Récuperation du refreshToken depuis le cookie
    const refreshTokenFromCookie = req.cookies?.refreshToken;

    if (!refreshTokenFromCookie) {
      return res.status(204).end();
    }

    //2. Décodification du refreshToken et comprobation de validité
    let decodedPayload;
    try {
      decodedPayload = verifyToken(
        refreshTokenFromCookie,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (err) {
      return res
        .status(403)
        .json({ ok: false, message: "Invalid or expired refresh token" });
    }
    //3. Récuperation de refreshToken du propiétaire
    const user = await userExists("_id", decodedPayload._id);

    if (!user) {
      return res.status(401).json({ ok: false, message: "unknown user" });
    }

    //4. Validation entre les deux tokens (cookie et utilisateur). SECURITE ++
    const isTokenValid = await compareTokens(
      refreshTokenFromCookie,
      user.refreshToken
    );
    if (!isTokenValid) {
      return res
        .status(403)
        .json({ ok: false, message: "Refresh token does not match" });
    }

    //5. Géneration du nouvel accessToken
    const accessToken = generateAccessToken({ _id: user._id, role: user.role });
    const accessTokenExpiresAt = calculateExpirationDate(
      process.env.JWT_EXPIRES_IN
    );

    //6. Géneration du nouvel refreshToken
    const newRefreshToken = generateRefreshToken(user);
    // le nouveau refreshToken est hashé... SECURITE ++
    const hashedRefreshToken = await hasher(newRefreshToken);

    // 7. Mise à jour des tokens de l'utilisateur
    user.refreshToken = hashedRefreshToken;
    await saveUser(user);

    // 8. Renvoi du nouveau refreshToken et nouveau accessToken dans un cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // true si HTTPS
      sameSite: "Lax", // autorise les cookies même entre localhost:5000 et localhost:5173
      maxAge: Number(process.env.COOKIE_LIFETIME) || 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: false,
      secure: false, // true si HTTPS
      sameSite: "Lax", // autorise les cookies même entre localhost:5000 et localhost:5173
      maxAge: Number(process.env.COOKIE_LIFETIME) || 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = {
      _id: user._id,
      email: user.email,
      role: user.role,
      // ajoute d'autres champs utiles, mais jamais refreshToken ni mot de passe
      name: user.name,
      first_name: user.first_name,
      phone: user.phone,
      address: user.address,
    };

    res.status(200).json({
      ok: true,
      message: "Access token refreshed successfully",
      user: safeUser,
    });
  } catch (error) {
    // Ici, le token est présent mais invalide ou expiré
    console.error("Refresh token invalide ou expiré :", error);
    return res
      .status(401)
      .json({ ok: false, message: "invalid or expired refresh token" });
  }
};
