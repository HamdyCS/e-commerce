import { Axios } from "../api/Axios";
import config from "../config";
import type AddItemToCartDto from "../dtos/AddItemToCartDto";
import type CartDto from "../dtos/CartDto";
import type CartItemDto from "../dtos/CartItemDto";

import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "./localStorageService";

export async function getActiveCart(isAuthenticated: boolean) {
  //authenticated user (get cart from api)
  if (isAuthenticated) {
    const reponse = await Axios.get<CartDto>(config.cart.getActive);
    return reponse.data;
  }
  //guest user (get cart from local storage)
  const cart = getItemFromLocalStorage<CartDto>("cart");
  return cart;
}

export async function mergeGuestCartWithAuthCart(guestCart: CartDto) {
  const activeCart = await getActiveCart(true);

  //if no active cart, return guest cart
  if (!activeCart) {
    return guestCart;
  }

  const addItemsToCartDtos: AddItemToCartDto[] = guestCart.sellerProducts.map(
    (item) => {
      return {
        sellerProductId: item.sellerProductId,
        quantity: item.quantity,
        shoppingCartId: activeCart.id,
      };
    },
  );

  //call api to add items to cart
  const response = await Axios.post<CartDto>(
    config.cart.addItemsToCart(activeCart.id),
    addItemsToCartDtos,
  );

  //remove guest cart from local storage
  removeItemFromLocalStorage("cart");

  return response.data;
}

export async function addToCart(
  isAuthenticated: boolean,
  cartItem: CartItemDto,
) {
  //authenticated user (add to cart in api)
  if (isAuthenticated) {
    const addItemToCartDto: AddItemToCartDto = {
      sellerProductId: cartItem.sellerProductId,
      quantity: cartItem.quantity,
      shoppingCartId: cartItem.shoppingCartId || 0,
    };
    const response = await Axios.post<CartDto>(
      config.cart.addToCart(cartItem.shoppingCartId || 0),
      addItemToCartDto,
    );
    return response.data;
  }

  //guest user (add to cart in local storage)
  const cart = getItemFromLocalStorage<CartDto>("cart");

  //if no cart in local storage, create new cart
  if (!cart) {
    //create new cart
    const newCart: CartDto = {
      id: 0,
      createdAt: new Date().toISOString(),
      userId: "",
      sellerProducts: [cartItem],
    };

    //save new cart in local storage
    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart;
  }

  //if cart exists, update it
  const oldItem = cart.sellerProducts.find(
    (item) => item.sellerProductId === cartItem.sellerProductId,
  );

  //if old item exists, update it
  if (oldItem) {
    oldItem.quantity = cartItem.quantity;
    oldItem.totalPrice = cartItem.totalPrice;
  } else {
    //add new item to cart
    cart.sellerProducts.push(cartItem);
  }

  //save cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export async function deleteItemFromCart(
  isAuthenticated: boolean,
  cartItem: CartItemDto,
) {
  //authenticated user (delete from api)
  if (isAuthenticated) {
    const response = await Axios.delete<CartDto>(
      `${config.cart.deleteItemFromCart(cartItem.shoppingCartId || 0)}/${cartItem.id}`,
    );
    return response.data;
  }

  //guest user (delete from local storage)
  const cart = getItemFromLocalStorage<CartDto>("cart");

  //if no cart in local storage, return null
  if (!cart) {
    return null;
  }

  //remove item from cart
  cart.sellerProducts = cart.sellerProducts.filter(
    (item) => item.sellerProductId !== cartItem.sellerProductId,
  );

  //save cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}
