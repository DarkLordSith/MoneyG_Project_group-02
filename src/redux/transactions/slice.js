import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  fetchSummary,
  fetchCategories,
} from "./operations";

const initialState = {
  items: [],
  summary: {
    income: {}, 
    expense: {}, 
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  },
  categories: [],
  isLoading: false,
  error: null,
  selectedMonth: null,
  selectedYear: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
        if (action.payload.type === "income") {
          state.totalIncome += action.payload.amount;
          state.balance += action.payload.amount;
        } else {
          state.totalExpenses += action.payload.amount;
          state.balance -= action.payload.amount;
        }
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })

      .addCase(fetchSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        const { income, expense, totalIncome, totalExpense, balance } = action.payload;
        state.summary = {
          income: income || {},
          expense: expense || {},
          totalIncome,
          totalExpense,
          balance,
        };
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     .addCase(fetchCategories.pending, (state) => {
       state.isLoading = true;
       state.error = null;
     })
     .addCase(fetchCategories.fulfilled, (state, action) => {
       state.isLoading = false;
       state.categories = action.payload;
     })
     .addCase(fetchCategories.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.payload;
     })

  },
});

export const { setSelectedMonth, setSelectedYear } = transactionsSlice.actions;

export default transactionsSlice.reducer;
