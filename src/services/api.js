import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  baseURL: "https://money-guard-backend-lnfk.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
