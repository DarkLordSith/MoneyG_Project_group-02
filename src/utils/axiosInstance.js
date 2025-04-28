import axios from "axios";
import { getAuthToken } from "../utils/authToken";

const axiosInstance = axios.create({
  baseURL: "https://money-guard-backend-lnfk.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
