// src/redux/finance/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "../global/slice";

// НОВА ОПЕРАЦІЯ - отримання балансу користувача
export const fetchBalance = createAsyncThunk(
  "finance/fetchBalance",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true));

      // Використовуємо axios напряму, як в ваших інших операціях
      const { data } = await axios.get("/transactions-summary");

      console.log("Balance response:", data); // Для дебагу

      if (data.periodTotal !== undefined) {
        return data.periodTotal;
      }
      if (data.totalBalance !== undefined) {
        return data.totalBalance;
      }
      if (data.balance !== undefined) {
        return data.balance;
      }

      console.warn("Unexpected balance format:", data);
      return 0;
    } catch (error) {
      console.error("Error fetching balance:", error.response || error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);
