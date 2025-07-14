// frontend/src/outils/deleteCourse.js

import { apiRequest } from "./apiRequest.js";
import { ROUTE_COURSE_DELETE } from "../config.js";

export async function deleteCourse(courseId) {
  try {
    const url = `${ROUTE_COURSE_DELETE}/:${courseId}`;

    const response = await apiRequest({
      url,
      method: "DELETE",
      credentials: "include", // required to send cookies
    });

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
      message: "course deleted successful",
    };
  } catch (error) {
    return {
      ok: false,
      message: "course delete failed: " + error.message,
    };
  }

  return await response.json(); // optionnel, selon ta route backend
}
