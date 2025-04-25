export const selectTransactions = (state) => state.transactions.items;
export const selectSummary = (state) => state.transactions.summary;
export const selectCategories = (state) => state.transactions.categories;


export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectError = (state) => state.transactions.error;