import axios from "axios";
import { setAuthToken, getAuthToken } from "./authToken";
import { store } from "../redux/store";
import { logout } from "../redux/auth/operations";

const axiosInstance = axios.create({
  baseURL: "https://money-guard-backend-lnfk.onrender.com",
  withCredentials: true, // чтобы refresh работал с cookie
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Обработка только 401 ошибки и только если токен есть
    const isUnauthorized = error.response?.status === 401;
    const hasToken = !!getAuthToken();
    const isRetry = originalRequest._retry;

    if (isUnauthorized && !isRetry && hasToken) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          "https://money-guard-backend-lnfk.onrender.com/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.data.accessToken;
        if (!newToken) throw new Error("No token in refresh response");

        setAuthToken(newToken);
        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        setAuthToken(null);
        localStorage.removeItem("persist:root");
        store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
