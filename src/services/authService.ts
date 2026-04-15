import { Axios } from "../api/Axios";
import config from "../config";
import type CartDto from "../dtos/CartDto";
import type ForgetPasswordDto from "../dtos/ForgetPasswordDto";
import type { LoginDto } from "../dtos/LoginDto";
import type { SignUpDto } from "../dtos/SignUpDto";
import type UpdateEmailDto from "../dtos/UpdateEmailDto";
import type UpdateInfoDto from "../dtos/UpdateInfoDto";
import type { UpdatePasswordDto } from "../dtos/UpdatePasswordDto";
import type UserDto from "../dtos/UserDto";
import { mergeGuestCartWithAuthCart } from "./cartService";

export const isEmailExist = async (email: string) => {
  const response = await Axios.get<boolean>(
    `${config.auth.isEmailExist}?email=${email}`,
  );
  return response.data;
};

export const signUp = async (data: SignUpDto) => {
  const response = await Axios.post<UserDto>(`${config.auth.signUp}`, data);
  return response.data;
};

export const login = async (
  data: LoginDto,
  cart?: CartDto,
): Promise<{
  user: UserDto | null;
  cart: CartDto | null;
}> => {
  const response = await Axios.post<UserDto>(`${config.auth.login}`, data);
  const user = response.data;

  //check if user is null
  if (user === null) {
    return { user: null, cart: null };
  }

  //check if user is customer
  if (
    user.roles.includes("Customer") &&
    cart &&
    cart.sellerProducts.length > 0
  ) {
    const newCart = await mergeGuestCartWithAuthCart(cart);
    return { user, cart: newCart };
  }

  return { user, cart: null };
};

export const resetPassword = async (data: ForgetPasswordDto) => {
  const response = await Axios.put(`${config.auth.forgetPassword}`, data);
  return response.data;
};

export const getAuthUser = async () => {
  const response = await Axios.get<UserDto>(`${config.auth.getAuthUser}`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await Axios.post(`${config.auth.refreshToken}`);
  return response.data;
};

export const updateInfo = async (data: UpdateInfoDto) => {
  const response = await Axios.put<UserDto>(`${config.auth.updateInfo}`, data);
  return response.data;
};

export const updatePassword = async (data: UpdatePasswordDto) => {
  const response = await Axios.put<UserDto>(
    `${config.auth.updatePassword}`,
    data,
  );
  return response.data;
};

export const updateEmail = async (data: UpdateEmailDto) => {
  const response = await Axios.put<UserDto>(`${config.auth.updateEmail}`, data);
  return response.data;
};

export const logout = async () => {
  const response = await Axios.post(`${config.auth.logout}`);
  return response.data;
};
