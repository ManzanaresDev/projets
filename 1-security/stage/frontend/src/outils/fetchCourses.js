// frontend/src/outils/fetchCourses.js

// import { ROUTE_COURSE_FETCH } from "../config.js";
import { ROUTES } from "../config.js";

import { apiRequest } from "../outils/apiRequest.js";

export async function fetchCourses() {
  try {
    const url = ROUTES.ROUTE_COURSE_FETCH;

    const response = await apiRequest({
      url,
      method: "GET",
      credentials: "include", // required to send cookies
    });

    let result = {};
    try {
      result = await response.json();
      return Array.isArray(result.courses) ? result.courses : [];
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
