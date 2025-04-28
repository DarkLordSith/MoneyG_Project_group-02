// Универсальный обработчик ошибок для createAsyncThunk
export const handleError = (error, thunkAPI) => {
  const message =
    error.response?.data?.message || error.message || "Unknown error";
  console.error("API Error:", message);
  return thunkAPI.rejectWithValue(message);
};
