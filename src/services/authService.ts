import { Axios } from "../api/Axios";
import config from "../config";
import type { LoginDto } from "../dtos/LoginDto";
import type { RegisterDto } from "../dtos/RegisterDto";
import type ResetPasswordDto from "../dtos/ResetPasswordDto";
import type { UserDto } from "../dtos/UserDto";

export const isEmailExist = async (email: string) => {
  const response = await Axios.get<boolean>(
    `${config.auth.isEmailExist}?email=${email}`,
  );
  return response.data;
};

export const signUp = async (data: RegisterDto) => {
  const response = await Axios.post<UserDto>(`${config.auth.signUp}`, data);
  return response.data;
};

export const login = async (data: LoginDto) => {
  const response = await Axios.post<UserDto>(`${config.auth.login}`, data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordDto) => {
  const response = await Axios.put(`${config.auth.resetPassword}`, data);
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
