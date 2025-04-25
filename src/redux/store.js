// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { authReducer } from "./auth/slice";
import transactionsReducer from "./transactions/slice";
import { globalReducer } from "./global/slice";
// import { financeReducer } from "./finance/slice"; // НОВИЙ ІМПОРТ - редюсер для фінансових даних

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  global: globalReducer,
  // finance: financeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
