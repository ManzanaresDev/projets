// frontend/src/outils.token.outils.js

import { jwtDecode } from "jwt-decode";

export function tokenIsAdmin(token) {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== "admin") {
      return false;
    }
  } catch (err) {
    // Token invalide ou malformé
    return false;
  }

  return true;
}
