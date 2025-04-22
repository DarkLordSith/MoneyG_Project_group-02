import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactionStats } from "./operations";


const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    summary: [],
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload.categories;
        state.totalIncome = action.payload.totalIncome;
        state.totalExpenses = action.payload.totalExpenses;
        state.balance = action.payload.balance;
        state.categories = action.payload.categories;
      })
      .addCase(fetchTransactionStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;