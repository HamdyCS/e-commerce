import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type UserDto from "../../dtos/UserDto";

export interface authSliceState {
  user: UserDto | null;
}

const initialState: authSliceState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<UserDto>) {
      state.user = action.payload;
    },
    setAuthUserEmail(state, action: PayloadAction<string>) {
      if (state.user) state.user.email = action.payload;
    },
  },
});
export const { setAuthUser, setAuthUserEmail } = authSlice.actions;
export default authSlice.reducer;
