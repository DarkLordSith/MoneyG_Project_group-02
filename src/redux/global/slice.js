import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Оновлює стан завантаження
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;

/*
СКЕЛЕТ ДЛЯ ТЕБЕ:

- Тут створюємо глобальний slice для isLoading
- Зовні експортуємо action setIsLoading і reducer globalReducer
- Цей slice буде відповідати за показ або приховування Loader в усьому застосунку
*/
