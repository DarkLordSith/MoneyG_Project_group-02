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
    const persistedAuth = JSON.parse(localStorage.getItem("persist:root"));

    if (!persistedAuth) return null;

    const parsedAuth = JSON.parse(persistedAuth.auth);
    const token = parsedAuth.token;
    return token;
  } catch (error) {
    return null;
  }
};
export const saveAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};
