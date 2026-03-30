import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type CartDto from "../../dtos/CartDto";

export interface CartSliceState {
  cart: CartDto | null;
}

const initialState: CartSliceState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartDto>) {
      state.cart = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
