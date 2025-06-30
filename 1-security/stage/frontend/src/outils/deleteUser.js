// frontend/src/outils/deleteUser.js

import { apiRequest } from "./apiRequest.js";
// import { ROUTE_USER_DELETE } from "../config.js";
import { ROUTES } from "../config.js";

export async function deleteUser(userId) {
  try {
    const url = `${ROUTES.ROUTE_USER_DELETE}/${userId}`;

    const response = await apiRequest({
      url,
      method: "DELETE",
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
      message: "user deleted successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "user delete failed: " + error.message,
    };
  }

  return await response.json(); // optionnel, selon ta route backend
}
