import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../redux/hook/reduxHooks";
import type { RootState } from "../redux/store/store";
import { setCart } from "../redux/slices/cartSlice";
import {
  addToCart,
  deleteItemFromCart,
  getActiveCart,
} from "../services/cartService";
import type CartItemDto from "../dtos/CartItemDto";

export function useGetActiveCart() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const isAuthenticated = user !== null;
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const cart = await getActiveCart(isAuthenticated);

      //set cart in redux store
      if (cart) {
        dispatch(setCart(cart));
      }

      return cart;
    },
  });
}

export function useAddItemToCart() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const isAuthenticated = user !== null;
  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async (cartItem: CartItemDto) => {
      const cart = await addToCart(isAuthenticated, cartItem);

      //set cart in redux store
      if (cart) {
        dispatch(setCart(cart));
      }
    },
  });
}

export function useDeleteItemFromCart() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const isAuthenticated = user !== null;
  return useMutation({
    mutationKey: ["delete-from-cart"],
    mutationFn: async (cartItem: CartItemDto) => {
      const cart = await deleteItemFromCart(isAuthenticated, cartItem);

      //set cart in redux store
      if (cart) {
        dispatch(setCart(cart));
      }
    },
  });
}
