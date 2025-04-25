import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "../global/slice"; // Імпорт дії для керування лоадером
import { setAuthToken } from "../auth/operations"; 
//import { selectToken } from "../auth/selectors";

//axios.defaults.baseURL = "https://money-guard-backend-lnfk.onrender.com";
//axios.defaults.withCredentials = true;



//const setAuthHeader = (state) => {
 // const token = selectToken(state);
// if (token) {
 //  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

 //   localStorage.setItem("token", token);
//  } else {
//    delete axios.defaults.headers.common.Authorization;
//    localStorage.removeItem("token");
//  }
//};



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
    const state = thunkAPI.getState();
setAuthToken(state);

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

export const fetchSummary = createAsyncThunk(
  'transactions/fetchSummary',
  async ({ month, year }, thunkAPI) => {
    const state = thunkAPI.getState();
    setAuthToken(state.auth.token); 
    try {
      thunkAPI.dispatch(setIsLoading(true));
      const response = await axios.get('/transactions/summary', {
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
    const state = thunkAPI.getState();
    setAuthToken(state.auth.token); 

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