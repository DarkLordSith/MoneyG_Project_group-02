import axiosInstance from "./axiosInstance";

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};
