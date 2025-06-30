// frontend/src/outils/TryRefresh

// import { ROUTE_TOKEN_REFRESH } from "../config.js";
import { ROUTES } from "../config.js";

export async function tryRefresh() {
  try {
    const res = await fetch(ROUTES.ROUTE_TOKEN_REFRESH, {
      method: "POST",
      credentials: "include",
    });

    // Si la réponse est vide, inutile de parser en JSON
    const contentLength = res.headers.get("content-length");
    if (!res.ok || !contentLength || contentLength === "0") {
      return null;
    }

    const result = await res.json();
    return result?.user || null;
  } catch (error) {
    console.error("Erreur réseau lors du refresh :", error);
    return null;
  }
}
