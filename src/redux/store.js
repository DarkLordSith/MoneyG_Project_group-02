import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { authReducer } from "./auth/slice";
import transactionsReducer from "./transactions/slice";
import { globalReducer } from "./global/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  global: globalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
