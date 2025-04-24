import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "../global/slice";

axios.defaults.baseURL = "https://money-guard-backend-lnfk.onrender.com";
axios.defaults.withCredentials = true;

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
      thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axios.post("/auth/register", credentials);
      setAuthToken(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axios.post("/auth/login", credentials);
      setAuthToken(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setIsLoading(true));
    await axios.post("/auth/logout");
    setAuthToken(null);
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    thunkAPI.dispatch(setIsLoading(false));
  }
});

export const refreshUser = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    let token = state.auth.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axios.post("/auth/refresh", null, {
        withCredentials: true,
      });

      setAuthToken(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "/auth/current",
  async (_, thunkAPI) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      setAuthToken(token);
      const { data } = await axios.get("/auth/current");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }
);
