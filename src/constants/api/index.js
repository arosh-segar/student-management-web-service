import axios from "axios";

export const API_URIS = {
  CORE_API: "https://student-management-core.azurewebsites.net",
  AUTH_API: "https://student-management-auth.azurewebsites.net",
  UTIL_API: "https://student-management-util.azurewebsites.net",
};

export const login = async (userName, password) => {
  return await axios.post(`${API_URIS.AUTH_API}/api/auth/login`, {
    userName,
    password,
  });
};

export const register = async (email, userName, password) => {
  return await axios.post(`${API_URIS.AUTH_API}/api/auth/register`, {
    email,
    userName,
    password,
  });
};
