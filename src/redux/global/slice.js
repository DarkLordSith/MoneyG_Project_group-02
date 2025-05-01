import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loadingCounter: 0, // Счетчик активных запросов
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Старый способ обновления состояния загрузки
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Новый способ, учитывающий несколько одновременных запросов
    startLoading: (state) => {
      state.loadingCounter += 1;
      state.isLoading = state.loadingCounter > 0;
    },

    stopLoading: (state) => {
      state.loadingCounter = Math.max(0, state.loadingCounter - 1);
      state.isLoading = state.loadingCounter > 0;
    },

    // Сбросить счетчик загрузки (использовать при критических ошибках)
    resetLoading: (state) => {
      state.loadingCounter = 0;
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, startLoading, stopLoading, resetLoading } =
  globalSlice.actions;
export const globalReducer = globalSlice.reducer;

/*
- Улучшенный глобальный slice для isLoading с поддержкой счетчика запросов
- Это позволит избежать проблем с параллельными запросами, когда один запрос
  может отключить лоадер до завершения других запросов
- Экспортируем новые actions для управления состоянием загрузки
*/
