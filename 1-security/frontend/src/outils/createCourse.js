// frontend/src/outils/createCourse.js

import { apiRequest } from "./apiRequest.js";
import { ROUTE_CREATE_COURSE } from "../config.js";

export const createCourse = async (formData) => {
  try {
    const response = await apiRequest({
      url: ROUTE_CREATE_COURSE,
      method: "POST",
      data: formData,
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
      message: "course created successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "course creation failed: " + error.message,
    };
  }
};
