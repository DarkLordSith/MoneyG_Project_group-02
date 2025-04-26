import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "../global/slice";
import { setAuthToken } from "../../utils/authToken";

const prepareAuthHeader = (thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (token) {
    setAuthToken(token);
  }
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    prepareAuthHeader(thunkAPI);
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.get("/transactions/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData, thunkAPI) => {
    prepareAuthHeader(thunkAPI);
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.post("/transactions/", transactionData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, thunkAPI) => {
    prepareAuthHeader(thunkAPI);
    try {
      thunkAPI.dispatch(setIsLoading(true));
      await axios.delete(`/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const fetchSummary = createAsyncThunk(
  "transactions/fetchSummary",
  async ({ month, year }, thunkAPI) => {
    prepareAuthHeader(thunkAPI);
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.get("/transactions/summary", {
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "transactions/fetchCategories",
  async ({ month, year }, thunkAPI) => {
    prepareAuthHeader(thunkAPI);
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.get("/transactions/categories", {
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);
