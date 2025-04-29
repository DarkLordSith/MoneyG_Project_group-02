import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://money-guard-backend-lnfk.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
