// frontend/src/outils/tokenFromCookie.js

import Cookies from "js-cookie";

export function getTokenFromCookie() {
  return Cookies.get("accessToken");
}
