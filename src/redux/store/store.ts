import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import otpReducer from "../slices/signUpSlice";
import themeReducer from "../slices/themeSlice";

export const store = configureStore({
  reducer: {
    otp: otpReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
