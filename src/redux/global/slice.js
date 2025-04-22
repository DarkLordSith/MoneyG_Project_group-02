import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
