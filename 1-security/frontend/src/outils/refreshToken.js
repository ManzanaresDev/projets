// frontend/src/outils/refreshToken.js

import { ROUTE_TOKEN_REFRESH } from "../config.js";

export async function refreshToken() {
  try {
    const response = await fetch(ROUTE_TOKEN_REFRESH, {
      method: "POST",
      credentials: "include",
    });

    // 👉 Éviter le crash si le corps est vide (ex. 204 No Content)
    if (response.status === 204) {
      return false;
    }

    const result = await response.json();

    if (response.ok && result.ok) return true;
    else return false;
  } catch (error) {
    console.error("Refresh failed: ", error);
    return false;
  }
}
