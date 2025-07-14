// frontend/src/outils/forget-password.js

import { apiRequest } from "./apiRequest.js";
import { ROUTE_USER_FORGOT_PASSWORD } from "../config.js";

export async function forgetPassword(user) {
  if (!user) {
    return { ok: false, message: "Email required" };
  }

  const data = {
    email: user,
  };

  const url = ROUTE_USER_FORGOT_PASSWORD;

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

    return { ok: true, message: "Email sent successfully" };
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes("failed to fetch")) {
      return { ok: false, message: "Server error" };
    }
    return { ok: false, message: err.message || "server error" };
  }
}
