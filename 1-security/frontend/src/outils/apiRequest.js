//
import { refreshToken } from "./refreshToken.js";

export async function apiRequest({
  url,
  method,
  data = null,
  headers = {},
  credentials = "include",
}) {
  const config = {
    method,
    headers: {
      Accept: "application/json",
      ...headers,
    },
    credentials,
  };

  if (data && method !== "GET") {
    if (data instanceof FormData) {
      config.body = data;
    } else {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(data);
    }
  }

  try {
    let response = await fetch(url, config);

    // Cas 204 No Content → ne rien faire de plus. Utilisateur non connecté
    if (response.status === 204) {
      return response;
    }

    // Cas 401 Unauthorized → essayer de refresh
    if (response.status === 401) {
      const refreshed = await refreshToken();

      if (refreshed?.ok) {
        // Retry avec nouveau token
        response = await fetch(url, config);
        return response;
      } else {
        console.warn("No valid session. Not retrying or logging out.");
        return response; // Retourne l'erreur 401 sans logout
      }
    }
    return response;
  } catch (error) {
    console.error("API request failed:", error.message);
    throw error;
  }
}
