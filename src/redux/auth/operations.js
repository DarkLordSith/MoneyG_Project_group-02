import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setIsLoading } from "../global/slice";
import { setAuthToken } from "../../utils/authToken";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.post("/auth/register", credentials);
      return data.data;
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
      const { data } = await axiosInstance.post("/auth/login", credentials);
      const token = data.data.accessToken;
      setAuthToken(token);
      return { accessToken: token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setIsLoading(true));
    await axiosInstance.post("/auth/logout");
    setAuthToken(null);
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  } finally {
    thunkAPI.dispatch(setIsLoading(false));
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.post("/auth/refresh");
      setAuthToken(data.data.accessToken);
      return data.data;
    } catch (error) {
      localStorage.removeItem("persist:root");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/auth/current");
      return data.data;
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        await thunkAPI.dispatch(logout()).unwrap;
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);
