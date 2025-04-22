import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransactionStats = createAsyncThunk(
  'statistics/fetchTransactionStats',
  async ({ month, year }) => {
    const { data } = await axios.get(`/api/statistics?month=${month}&year=${year}`);
      return data;
      
  }
);