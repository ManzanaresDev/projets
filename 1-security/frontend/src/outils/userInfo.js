// frontend/src/outils/userInfo.js

import { apiRequest } from "./apiRequest.js";
import { ROUTE_USER_INFO, ROUTE_SAVE_USER_INFO } from "../config.js";

export async function getUserInfo() {
  const url = ROUTE_USER_INFO;

  try {
    const response = await apiRequest({
      url,
      method: "GET",
      credentials: "include",
    });

    let result = {};

    try {
      result = await response.json();
      console.log("user (apiRequest):", result);
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
      message: "info gathering successful",
      user: result.user,
    };
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes("failed to fetch")) {
      return { ok: false, message: "Server error" };
    }
    return { ok: false, message: err.message || "server error" };
  }
}

export async function saveUserInfo(info) {
  const url = ROUTE_SAVE_USER_INFO;
  const data = {
    name: info.name,
    first_name: info.first_name,
    email: info.email,
    phone: info.phone,
    address: info.address,
  };

  try {
    const response = await apiRequest({
      url,
      method: "PATCH", // Important : PATCH ou POST selon ton backend
      data,
      credentials: "include",
    });

    let result;

    try {
      result = await response.json();
    } catch (e) {
      return {
        ok: false,
        message: `Réponse invalide (non JSON), code HTTP ${response.status}`,
      };
    }

    if (!response.ok || !result.ok) {
      return {
        ok: false,
        message: result?.message || `Erreur HTTP ${response.status}`,
      };
    }

    return {
      ok: true,
      message: result.message || "Mise à jour réussie",
    };
  } catch (err) {
    const isNetworkError =
      err.message?.toLowerCase().includes("failed to fetch") ||
      err.message?.toLowerCase().includes("network");

    return {
      ok: false,
      message: isNetworkError
        ? "Erreur réseau ou serveur injoignable"
        : err.message || "Erreur serveur",
    };
  }
}
