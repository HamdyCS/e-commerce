import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface signUpSliceState {
  email: string;
  otp: string;
}

const initialState: signUpSliceState = {
  email: "",
  otp: "",
};

const signUpSlice = createSlice({
  name: "signUp",
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

export const { setEmail, setOtp } = signUpSlice.actions;
export default signUpSlice.reducer;
