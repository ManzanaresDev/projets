// frontend/src/outils/reset-password.js

import { apiRequest } from "./apiRequest.js";
import { ROUTE_USER_RESET_PASSWORD } from "../config.js";

export async function resetPassword(user, token) {
  if (!user) {
    return { ok: false, message: "Mot de passe requis" };
  }

  const data = {
    newPassword: user,
    token,
  };

  const url = ROUTE_USER_RESET_PASSWORD;

  try {
    const response = await apiRequest({
      url,
      method: "POST",
      data,
      credentials: "include",
    });

    let result = {};
    try {
      result = await response.json();
    } catch (e) {
      return { ok: false, message: `Erreur HTTP ${response.status}` };
    }

    if (!response.ok) {
      return {
        ok: false,
        message: result.message || `Erreur HTTP ${response.status}`,
      };
    }

    // Suppression de la vérification inutile de result.user
    return {
      ok: true,
      message: result.message || "Mot de passe mis à jour avec succès",
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message?.includes("Failed to fetch")
        ? "Erreur de connexion au serveur"
        : err.message || "Erreur serveur inconnue",
    };
  }
}
