import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { startLoading, stopLoading } from "../global/slice";
import { setAuthToken } from "../../utils/authToken";

// fetchTransactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());

      const token = thunkAPI.getState().auth.token;
      setAuthToken(token);

      const response = await axiosInstance.get("/transactions/");
      return response.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(stopLoading());
    }
  }
);

// addTransaction
export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());

      const token = thunkAPI.getState().auth.token;
      setAuthToken(token);

      const response = await axiosInstance.post(
        "/transactions/",
        transactionData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(stopLoading());
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, body }, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());

      const response = await axiosInstance.patch(`/transactions/${id}`, body);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to edit"
      );
    } finally {
      thunkAPI.dispatch(stopLoading());
    }
  }
);

// deleteTransaction
export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const response = await axiosInstance.delete(`/transactions/${id}`);
      return {
        deletedId: response.data._id,
        balanceAfter: response.data.balanceAfter,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(stopLoading());
    }
  }
);

export const fetchSummary = createAsyncThunk(
  "transactions/fetchSummary",
  async ({ month, year }, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());

      const token = thunkAPI.getState().auth.token;
      setAuthToken(token);

      const response = await axiosInstance.get("/transactions/summary", {
        params: { month, year },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(stopLoading());
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "transactions/fetchCategories",
  async ({ month, year }, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());

      const token = thunkAPI.getState().auth.token;
      setAuthToken(token);

      const response = await axiosInstance.get("/transactions/categories", {
        params: { month, year },
      });
      return { data: response.data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(stopLoading());
    }
  }
);
