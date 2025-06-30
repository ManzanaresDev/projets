// src/config.js

// export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// routes

export const ROUTES = {
  ROUTE_SIGNIN: `/user/signin`,
  ROUTE_REGISTER: `/user/register`,
  ROUTE_USER_RESET_PASSWORD: `/user/reset-password`,
  ROUTE_USER_FORGOT_PASSWORD: `/user/forgot-password`,
  ROUTE_USER_LOGOUT: `/user/logout`,
  ROUTE_USER_INFO: `/user/me`,
  ROUTE_USER_DELETE: `/user/delete`,
  ROUTE_TOKEN_REFRESH: `/auth/refresh`,
  ROUTE_SAVE_USER_INFO: `/user/saveInfo`,
  ROUTE_CREATE_COURSE: `/course/create`,
  ROUTE_COURSE_DELETE: `/course/delete`,
  ROUTE_COURSE_FETCH: `/course/courses`,
  ROUTE_USERS_FETCH: `/user/users`,
  ROUTE_USER_COURSES_FETCH: `/userCourse/courses`,
  ROUTE_TOGGLE_USER_COURSE: `/userCourse/toggle`,
};

// export const ROUTES = {
//   ROUTE_SIGNIN: `${BACKEND_URL}/user/signin`,
//   ROUTE_REGISTER: `${BACKEND_URL}/user/register`,
//   ROUTE_USER_RESET_PASSWORD: `${BACKEND_URL}/user/reset-password`,
//   ROUTE_USER_FORGOT_PASSWORD: `${BACKEND_URL}/user/forgot-password`,
//   ROUTE_USER_LOGOUT: `${BACKEND_URL}/user/logout`,
//   ROUTE_USER_INFO: `${BACKEND_URL}/user/me`,
//   ROUTE_USER_DELETE: `${BACKEND_URL}/user/delete`,
//   ROUTE_TOKEN_REFRESH: `${BACKEND_URL}/auth/refresh`,
//   ROUTE_SAVE_USER_INFO: `${BACKEND_URL}/user/saveInfo`,
//   ROUTE_CREATE_COURSE: `${BACKEND_URL}/course/create`,
//   ROUTE_COURSE_DELETE: `${BACKEND_URL}/course/delete`,
//   ROUTE_COURSE_FETCH: `${BACKEND_URL}/course/courses`,
//   ROUTE_USERS_FETCH: `${BACKEND_URL}/user/users`,
//   ROUTE_USER_COURSES_FETCH: `${BACKEND_URL}/userCourse/courses`,
//   ROUTE_TOGGLE_USER_COURSE: `${BACKEND_URL}/userCourse/toggle`,
// };

// export const ROUTE_SIGNIN = `${BACKEND_URL}/user/signin`;
// export const ROUTE_REGISTER = `${BACKEND_URL}/user/register`;
// export const ROUTE_USER_FORGOT_PASSWORD = `${BACKEND_URL}/user/forgot-password`;
// export const ROUTE_USER_RESET_PASSWORD = `${BACKEND_URL}/user/reset-password`;
// export const ROUTE_USER_LOGOUT = `${BACKEND_URL}/user/logout`;
// export const ROUTE_TOKEN_REFRESH = `${BACKEND_URL}/auth/refresh`;
// export const ROUTE_USER_INFO = `${BACKEND_URL}/user/me`;
// export const ROUTE_SAVE_USER_INFO = `${BACKEND_URL}/user/saveInfo`;
// export const ROUTE_CREATE_COURSE = `${BACKEND_URL}/course/create`;
// export const ROUTE_COURSE_FETCH = `${BACKEND_URL}/course/courses`;
// export const ROUTE_COURSE_DELETE = `${BACKEND_URL}/course/delete`;
// export const ROUTE_USER_DELETE = `${BACKEND_URL}/user/delete`;
// export const ROUTE_USERS_FETCH = `${BACKEND_URL}/user/users`;
// export const ROUTE_USER_COURSES_FETCH = `${BACKEND_URL}/userCourse/courses`;
// export const ROUTE_TOGGLE_USER_COURSE = `${BACKEND_URL}/userCourse/toggle`;
