// frontend/src/outils/signin.js

import { ROUTE_SIGNIN } from "../config.js";
import { apiRequest } from "./apiRequest.js";

export async function signin(user, pass) {
  if (!user || !pass) {
    return { ok: false, message: "User and password required" };
  }

  const data = {
    pseudo: user,
    password: pass,
  };

  const url = ROUTE_SIGNIN;

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
      // JSON invalide ou vide
      return { ok: false, message: `Erreur HTTP ${response.status}` };
    }

    if (!response.ok) {
      return {
        ok: false,
        message: result.message || `Erreur HTTP ${response.status}`,
      };
    }

    if (!result.ok || !result.user) {
      return { ok: false, message: result.message || "Unknown user" };
    }

    return {
      ok: true,
      message: "Connexion réussie",
    };
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes("failed to fetch")) {
      return { ok: false, message: "Server error" };
    }
    return { ok: false, message: err.message || "server error" };
  }
}
