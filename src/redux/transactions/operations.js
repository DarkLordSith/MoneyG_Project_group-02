// src/redux/transactions/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance"; // подключаем правильный axiosInstance
import { setIsLoading } from "../global/slice";

// fetchTransactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axiosInstance.get("/transactions/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

// addTransaction
export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axiosInstance.post(
        "/transactions/",
        transactionData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

// deleteTransaction
export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      await axiosInstance.delete(`/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

// fetchSummary
export const fetchSummary = createAsyncThunk(
  "transactions/fetchSummary",
  async ({ month, year }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axiosInstance.get("/transactions/summary", {
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

// fetchCategories
export const fetchCategories = createAsyncThunk(
  "transactions/fetchCategories",
  async ({ month, year }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axiosInstance.get("/transactions/categories", {
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

//export const fetchCategories = createAsyncThunk(
//  "transactions/fetchCategories",
//  async ({ month, year }, thunkAPI) => {
//    prepareAuthHeader(thunkAPI);
//    try {
//      thunkAPI.dispatch(setIsLoading(true));
//      const response = await axios.get("/transactions/summary", {
//        params: { month, year },
 //     });
//      return response.data;
//    } catch (error) {
//      return thunkAPI.rejectWithValue(error.message);
//    } finally {
//      thunkAPI.dispatch(setIsLoading(false));
//    }
//  }
//);

//export const fetchCategories = createAsyncThunk(
//  "transactions/fetchCategories",
//  async ({ month, year }, thunkAPI) => {
//    prepareAuthHeader(thunkAPI);
//    try {
//      thunkAPI.dispatch(setIsLoading(true));
//      const response = await axios.get("/transactions/summary", {
//        params: { month, year },
//      });
//
//      const { income, expenses } = response.data;
//
//      const incomeCategories = income?.categories || [];
//      const expenseCategories = expenses?.categories || [];
//
//      const allCategories = [...incomeCategories, ...expenseCategories];
//
//      // Витягуємо імена категорій
//      const categoryNames = allCategories.map((cat) => ({
//        id: cat.id || cat._id || cat.name, // запасний варіант для id
//        name: cat.name,
//      }));
//
//      const uniqueCategories = [
//        ...new Map(categoryNames.map((item) => [item.name, item])).values(),
//      ];
//
//      return uniqueCategories;
//
//    } catch (error) {
//      return thunkAPI.rejectWithValue(error.message);
//    } finally {
//      thunkAPI.dispatch(setIsLoading(false));
//    }
//  }
//);
