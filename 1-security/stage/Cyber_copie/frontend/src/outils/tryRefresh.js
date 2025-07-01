// frontend/src/outils/TryRefresh

import { ROUTE_TOKEN_REFRESH } from "../config.js";

// export async function tryRefresh() {
//   try {
//     const res = await fetch(ROUTE_TOKEN_REFRESH, {
//       method: "POST",
//       credentials: "include",
//     });

//     // Si la réponse est vide, inutile de parser en JSON
//     const contentLength = res.headers.get("content-length");
//     if (!res.ok || !contentLength || contentLength === "0") {
//       return null;
//     }

//     const result = await res.json();
//     return result?.user || null;
//   } catch (error) {
//     console.error("Erreur réseau lors du refresh :", error);
//     return null;
//   }
// }

export async function tryRefresh() {
  try {
    const res = await fetch(ROUTE_TOKEN_REFRESH, {
      method: "POST",
      credentials: "include",
    });

    console.log("Refresh token response status:", res.status);
    console.log("Refresh token response headers:", [...res.headers.entries()]);

    const contentLength = res.headers.get("content-length");
    console.log("Content-Length:", contentLength);

    if (!res.ok || !contentLength || contentLength === "0") {
      console.log("Refresh failed or empty response");
      return null;
    }

    const result = await res.json();
    console.log("Refresh token response body:", result);
    return result?.user || null;
  } catch (error) {
    console.error("Erreur réseau lors du refresh :", error);
    return null;
  }
}
