import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createUserReducer from "./slices/createUserSlice";
import transactionsReducer from "./slices/transactionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createUser: createUserReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
