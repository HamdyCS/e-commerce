import { useMutation, useQuery } from "@tanstack/react-query";
import type CartItemDto from "../dtos/CartItemDto";
import { useAppDispatch, useAppSelector } from "../redux/hook/reduxHooks";
import { setCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store/store";
import {
  addToCart,
  deleteItemFromCart,
  getActiveCart,
  updateCartItemQuantity,
} from "../services/cartService";

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

export function useUpdateCartItemQuantity() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const isAuthenticated = user !== null;
  return useMutation({
    mutationKey: ["update-cart-item"],
    mutationFn: async ({
      cartItem,
      sellerProductInShoppingCartId,
    }: {
      cartItem: CartItemDto;
      sellerProductInShoppingCartId: number;
    }) => {
      const cart = await updateCartItemQuantity(
        isAuthenticated,
        sellerProductInShoppingCartId,
        cartItem,
      );

      //set cart in redux store
      if (cart) {
        dispatch(setCart(cart));
      }
    },
  });
}
