export const selectTransactions = (state) => state.transactions.items;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectError = (state) => state.transactions.error;

export const selectSummary = (state) => state.transactions.summary;
//export const selectCategories = (state) => state.transactions.categories;
export const selectTotalIncome = (state) => state.transactions.totalIncome;
export const selectTotalExpenses = (state) => state.transactions.totalExpenses;
export const selectBalance = (state) => state.transactions.balance;

export const selectSelectedMonth = (state) => state.transactions.selectedMonth;
export const selectSelectedYear = (state) => state.transactions.selectedYear;