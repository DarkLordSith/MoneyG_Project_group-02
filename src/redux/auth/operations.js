import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "../global/slice"; // Імпорт дії для керування лоадером

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true)); // Показуємо лоадер перед запитом
      const { data } = await axios.post("/users/signup", credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false)); // Ховаємо лоадер після запиту
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true)); // Показуємо лоадер перед запитом
      const { data } = await axios.post("/users/login", credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false)); // Ховаємо лоадер після запиту
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setIsLoading(true)); // Показуємо лоадер перед запитом
    await axios.post("/users/logout");
    setAuthToken(null);
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    thunkAPI.dispatch(setIsLoading(false)); // Ховаємо лоадер після запиту
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    let token = state.auth.token || localStorage.getItem("token");

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      thunkAPI.dispatch(setIsLoading(true)); // Показуємо лоадер перед запитом
      setAuthToken(token);
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false)); // Ховаємо лоадер після запиту
    }
  }
);
