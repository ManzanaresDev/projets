// frontend/src/outils/fetchUserCourses.js

// import { ROUTE_USER_COURSES_FETCH } from "../config.js";
import { ROUTES } from "../config.js";
import { apiRequest } from "../outils/apiRequest.js";

export async function fetchUserCourses(userId) {
  try {
    const url = `${ROUTES.ROUTE_USER_COURSES_FETCH}/${userId}`;

    const response = await apiRequest({
      url,
      method: "GET",
      credentials: "include", // required to send cookies
    });

    if (!response.ok) {
      const err = await response.json();
      return [];
    }

    let result = {};
    try {
      result = await response.json();

      return Array.isArray(result.data) ? result.data : [];
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
