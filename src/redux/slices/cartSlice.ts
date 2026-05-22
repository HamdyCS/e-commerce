import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type CartDto from "../../dtos/CartDto";

export interface CartSliceState {
  cart: CartDto | null;
  totalCartPrice: number;
}

const initialState: CartSliceState = {
  cart: null,
  totalCartPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartDto>) {
      state.cart = action.payload;
      state.totalCartPrice =
        action.payload.sellerProducts.reduce(
          (acc, item) => (acc += item.totalPrice),
          0,
        ) || 0;
    },
    clearCart(state) {
      state.cart = null;
      state.totalCartPrice = 0;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
