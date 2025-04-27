import axiosInstance from "./axiosInstance";

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getAuthToken = () => {
  try {
    const persistedAuth = JSON.parse(localStorage.getItem("persist:auth"));
    if (!persistedAuth) return null;
    const parsedAuth = JSON.parse(persistedAuth.auth).token;
    const token = JSON.parse(parsedAuth.token);
    return token !== "null" ? token : null;
  } catch (error) {
    return null;
  }
};
