import { Axios } from "../api/Axios";
import config from "../config";
import type { LoginDto } from "../dtos/LoginDto";
import type { SignUpDto } from "../dtos/SignUpDto";
import type ForgetPasswordDto from "../dtos/ForgetPasswordDto";
import type { UserDto } from "../dtos/UserDto";
import type UpdateInfoDto from "../dtos/UpdateInfoDto";

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

export const login = async (data: LoginDto) => {
  const response = await Axios.post<UserDto>(`${config.auth.login}`, data);
  return response.data;
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
