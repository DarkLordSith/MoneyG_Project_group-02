import { createSlice } from "@reduxjs/toolkit";
import { fetchBalance } from "./operations";

// НОВИЙ СТАН - початковий стан для фінансових даних
const initialState = {
  totalBalance: 0, // Загальний баланс користувача
  isLoading: false, // Флаг завантаження для відображення спінера
  error: null, // Зберігання помилок
};

// НОВИЙ SLICE - управління станом фінансів
const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    // Місце для додаткових синхронних редюсерів
    // наприклад, очищення помилок або оновлення балансу локально
  },
  // НОВІ EXTRA REDUCERS - обробка асинхронних операцій
  extraReducers: (builder) => {
    builder
      // Стан очікування - коли запит відправлено
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Очищаємо попередні помилки
      })
      // Успішне завершення - коли отримано відповідь
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalBalance = action.payload; // Зберігаємо отриманий баланс
      })
      // Помилка - коли запит не вдався
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Зберігаємо текст помилки
      });
  },
});

export const financeReducer = financeSlice.reducer;
