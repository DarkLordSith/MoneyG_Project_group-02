// src/redux/transactions/selectors.js

const selectTransactions = (state) => state.transactions.items;
const selectIsLoading = (state) => state.transactions.isLoading;
const selectError = (state) => state.transactions.error;

const selectSummary = (state) => state.transactions.summary;
const selectCategories = (state) => state.transactions.categories;
const selectTotalIncome = (state) => state.transactions.totalIncome;
const selectTotalExpenses = (state) => state.transactions.totalExpenses;
const selectBalance = (state) => state.transactions.balance;

const selectSelectedMonth = (state) => state.transactions.selectedMonth;
const selectSelectedYear = (state) => state.transactions.selectedYear;

export const transactionSelectors = {
  selectTransactions,
  selectIsLoading,
  selectError,
  selectSummary,
  selectCategories,
  selectTotalIncome,
  selectTotalExpenses,
  selectBalance,
  selectSelectedMonth,
  selectSelectedYear,
};
