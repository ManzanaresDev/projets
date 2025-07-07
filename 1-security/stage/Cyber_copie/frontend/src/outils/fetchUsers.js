// frontend/src/outils/fetchUsers.js

// frontend/src/outils/fetchCourses.js

import { ROUTE_USERS_FETCH } from "../config.js";
import { apiRequest } from "../outils/apiRequest.js";

export async function fetchUsers() {
  try {
    const url = ROUTE_USERS_FETCH;

    const response = await apiRequest({
      url,
      method: "GET",
      credentials: "include", // required to send cookies
    });

    let result = {};
    try {
      result = await response.json();

      return Array.isArray(result.users) ? result.users : [];
    } catch (e) {
      return [];
    }

    if (!response.ok) {
      return [];
    }

    return result;
  } catch (error) {
    return [];
  }
}
