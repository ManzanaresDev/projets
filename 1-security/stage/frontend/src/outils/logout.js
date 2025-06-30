// frontend/src/outils/logout.js

import { apiRequest } from "./apiRequest.js";
// import { ROUTE_USER_LOGOUT } from "../config.js";
import { ROUTES } from "../config.js";

export async function logout() {
  try {
    const url = ROUTES.ROUTE_USER_LOGOUT;

    const response = await apiRequest({
      url,
      method: "POST",
      credentials: "include", // required to send cookies
    });

    let result = {};
    try {
      result = await response.json();
    } catch (e) {
      return {
        ok: false,
        message: `Invalid response (expected JSON) — HTTP status ${response.status}`,
      };
    }

    if (!response.ok || !result.ok) {
      return {
        ok: false,
        message: result.message || `HTTP error ${response.status}`,
      };
    }

    return {
      ok: true,
      message: "Logout successful",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Logout failed: " + error.message,
    };
  }
}
