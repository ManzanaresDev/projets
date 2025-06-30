// frontend/src/outils/register.js

import { apiRequest } from "./apiRequest.js";
// import { ROUTE_REGISTER } from "../config.js";
import { ROUTES } from "../config.js";

export async function register(user) {
  if (!user) {
    return { ok: false, message: "User required" };
  }

  const url = ROUTES.ROUTE_REGISTER;

  try {
    const response = await apiRequest({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: { user },
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

    if (!result.ok || !result.user) {
      return { ok: false, message: result.message || "Unknown user" };
    }

    return { ok: true, message: "User registered successfully" };
  } catch (err) {
    let message = "Server error";

    if (err && typeof err.message === "string" && err.message.trim() !== "") {
      const lower = err.message.toLowerCase();

      if (
        lower.includes("failed to fetch") ||
        lower.includes("networkerror") ||
        lower.includes("network error")
      ) {
        message = "Server / network error";
      } else {
        message = err.message;
      }
    }

    return { ok: false, message };
  }
}
