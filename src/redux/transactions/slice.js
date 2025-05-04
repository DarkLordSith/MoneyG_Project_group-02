import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  fetchSummary,
  editTransaction,
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
  incomeCategories: [],
  expenseCategories: [],
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
        const { balanceAfter, ...transaction } = action.payload;

        if (transaction && transaction._id) {
          state.items.unshift(transaction);
        }
        state.summary.balance = balanceAfter;
      })

      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const { balanceAfter, ...updatedTransaction } = action.payload;
        const index = state.items.findIndex(
          (t) => t._id === updatedTransaction._id
        );
        if (index !== -1) {
          state.items[index] = updatedTransaction;
        }
        state.summary.balance = balanceAfter;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const { deletedId, balanceAfter } = action.payload;
        state.items = state.items.filter((item) => item._id !== deletedId);
        state.summary.balance = balanceAfter;
      })

      .addCase(fetchSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        const { income, expense, totalIncome, totalExpense, balance } =
          action.payload;
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
        const { data } = action.payload;

        state.incomeCategories = Object.entries(data.income || {});
        state.expenseCategories = Object.entries(data.expense || {});
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedMonth, setSelectedYear } = transactionsSlice.actions;

export default transactionsSlice.reducer;
