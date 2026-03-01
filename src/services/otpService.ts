import { Axios } from "../api/Axios";
import config from "../config";

export const sendOtp = async (email: string) => {
  await Axios.post(`${config.auth.otp.send}?email=${email}`);
};

export const checkOtp = async (email: string, otp: string) => {
  const response = await Axios.get<boolean>(
    `${config.auth.otp.check}?email=${email}&otp=${otp}`,
  );

  //if otp is not valid
  if (!response.data) {
    throw new Error("Invalid OTP");
  }
};
