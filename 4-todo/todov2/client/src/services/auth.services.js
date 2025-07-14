// client/src/services/auth.services.js
import FetchService from "./fetch.service.js";

async function registerUser(userData) {
  const host = `${import.meta.env.VITE_BACKEND_URL}api/user/auth/register`;

  const registerFetchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const registerRequest = await FetchService.doRequest(
    host,
    registerFetchConfig
  );

  return registerRequest;
}

async function loginUser(userData) {
  const host = `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/login`;

  const loginFetchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const loginRequest = await FetchService.doRequest(host, loginFetchConfig);

  return loginRequest;
}

async function logout() {
  const host = `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/logout`;
  const logoutFetchConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const logoutRequest = await FetchService.doRequest(host, logoutFetchConfig);

  return logoutRequest;
}

const AuthServices = {
  registerUser,
  loginUser,
  logout,
};

export default AuthServices;
