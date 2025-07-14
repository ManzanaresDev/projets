// client/src/servies/user.services.js
import FetchService from "./fetch.service.js";

async function getUserInfo() {
  const host = `${import.meta.env.VITE_BACKEND_URL}/api/user/me`;
  const userInfoFetchConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const userInfoRequest = await FetchService.doRequest(
    host,
    userInfoFetchConfig
  );

  return userInfoRequest;
}

const UserServices = {
  getUserInfo,
};

export default UserServices;
