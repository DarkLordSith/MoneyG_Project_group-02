import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "../global/slice"; // Імпорт дії для керування лоадером

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true)); // Показуємо лоадер перед запитом
      const response = await axios.get("/transactions/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false)); // Ховаємо лоадер після запиту
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true)); // Показуємо лоадер перед запитом
      const response = await axios.post("/transactions/", transactionData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false)); // Ховаємо лоадер після запиту
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true)); // Показуємо лоадер перед запитом
      await axios.delete(`/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false)); // Ховаємо лоадер після запиту
    }
  }
);
