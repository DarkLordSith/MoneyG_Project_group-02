// src/redux/finance/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchBalance } from "./operations";

const initialState = {
  totalBalance: 0,
  isLoading: false,
  error: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    // Можемо додати додаткові редюсери за потреби
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalBalance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const financeReducer = financeSlice.reducer;
