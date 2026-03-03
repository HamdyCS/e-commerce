import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface otpState {
  email: string;
  otp: string;
}

const initialState: otpState = {
  email: "",
  otp: "",
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setOtp(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },
  },
});

export const { setEmail, setOtp } = otpSlice.actions;
export default otpSlice.reducer;
