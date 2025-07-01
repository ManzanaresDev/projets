// frontend/src/config.js

// export const BACKEND_URL = "http://localhost:5000";
// export const BACKEND_URL =
import.meta.env.VITE_BACKEND_URL || "http://veilink.tech";

export const ROUTE_SIGNIN = `/user/signin`;
export const ROUTE_REGISTER = `user/register`;
export const ROUTE_USER_FORGOT_PASSWORD = `/user/forgot-password`;
export const ROUTE_USER_RESET_PASSWORD = `/user/reset-password`;
export const ROUTE_USER_LOGOUT = `/user/logout`;
export const ROUTE_TOKEN_REFRESH = `/auth/refresh`;
export const ROUTE_USER_INFO = `/user/me`;
export const ROUTE_SAVE_USER_INFO = `/user/saveInfo`;
export const ROUTE_CREATE_COURSE = `/course/create`;
export const ROUTE_COURSE_FETCH = `/course/courses`;
export const ROUTE_COURSE_DELETE = `/course/delete`;
export const ROUTE_USER_DELETE = `/user/delete`;
export const ROUTE_USERS_FETCH = `/user/users`;
export const ROUTE_USER_COURSES_FETCH = `/userCourse/courses`;
export const ROUTE_TOGGLE_USER_COURSE = `/userCourse/toggle`;
