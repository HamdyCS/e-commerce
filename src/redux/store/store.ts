import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "../slices/signUpSlice";

export const store = configureStore({
  reducer: {
    otp: otpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
