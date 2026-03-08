import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import otpReducer from "../slices/signUpSlice";

export const store = configureStore({
  reducer: {
    otp: otpReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
