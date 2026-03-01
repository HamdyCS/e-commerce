import { Axios } from "../api/Axios";
import config from "../config";
import type { SignUpDto } from "../dtos/SignUpDto";

export const isEmailExist = async (email: string) => {
  const response = await Axios.get<boolean>(
    `${config.auth.isEmailExist}?email=${email}`,
  );
  return response.data;
};

export const signUp = async (data: SignUpDto, otp: string) => {
  const response = await Axios.post<boolean>(
    `${config.auth.signUp}?otp=${otp}`,
    data,
  );
  return response.data;
};
