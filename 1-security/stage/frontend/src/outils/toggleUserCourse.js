//  frontend/src/outils/toggleUserCourse.js

import { apiRequest } from "./apiRequest.js";
// import { ROUTE_TOGGLE_USER_COURSE } from "../config.js";
import { ROUTES } from "../config.js";

export const toggleUserCourse = async (userId, courseId) => {
  try {
    const response = await apiRequest({
      url: ROUTES.ROUTE_TOGGLE_USER_COURSE,
      method: "PATCH",
      data: { userId, courseId },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) {
      return { ok: false, message: "Request failed (likely due to logout)" };
    }

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
      message: "user-course toggled successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "toggle user-course failed: " + error.message,
    };
  }
};
