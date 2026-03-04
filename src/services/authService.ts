import { Axios } from "../api/Axios";
import config from "../config";
import type { LoginDto } from "../dtos/LoginDto";
import type { RegisterDto } from "../dtos/RegisterDto";
import type ResetPasswordDto from "../dtos/ResetPasswordDto";

export const isEmailExist = async (email: string) => {
  const response = await Axios.get<boolean>(
    `${config.auth.isEmailExist}?email=${email}`,
  );
  return response.data;
};

export const signUp = async (data: RegisterDto) => {
  const response = await Axios.post<boolean>(`${config.auth.signUp}`, data);
  return response.data;
};

export const login = async (data: LoginDto) => {
  const response = await Axios.post<boolean>(`${config.auth.login}`, data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordDto) => {
  const response = await Axios.put(`${config.auth.resetPassword}`, data);
  return response.data;
};
