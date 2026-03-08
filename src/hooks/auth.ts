import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { LoginDto } from "../dtos/LoginDto";
import type { UserDto } from "../dtos/UserDto";
import { useAppDispatch } from "../redux/hook/reduxHooks";
import { setAuthUser } from "../redux/slices/authSlice";
import { setEmail, setOtp } from "../redux/slices/signUpSlice";
import {
  isEmailExist,
  login,
  resetPassword,
  signUp,
} from "../services/authService";
import { checkOtp, sendOtp } from "../services/otpService";
import type { UseSendOtpOptions } from "./types/UseSendOtpOptions";
import type { UseHookOptions } from "./types/UseHookOptions";
import type ResetPasswordDto from "../dtos/ResetPasswordDto";
import type { RegisterDto } from "../dtos/RegisterDto";

//register
export function useRegister() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<UserDto, AxiosError, RegisterDto>({
    mutationKey: ["signUp"],
    mutationFn: signUp,
    onSuccess: (data) => {
      dispatch(setAuthUser(data));
      navigate("/");
    },
  });
}

//login
export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //userDto => Data type
  //AxiosError => Error type
  //LoginDto => Variables type (mutationFn parameter)
  return useMutation<UserDto, AxiosError, LoginDto>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setAuthUser(data));
      navigate("/");
    },
  });
}

//reset password
export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, ResetPasswordDto>({
    mutationKey: ["reset-password"],
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/login");
    },
  });
}

//send otp
export function useSendOtp({ type, onSuccess }: UseSendOtpOptions) {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: async (email: string) => {
      const isExist = await isEmailExist(email);

      if (isExist && type === "signUp") {
        throw new Error("Email already exists");
      } else if (!isExist && type === "forgetPassword") {
        throw new Error("Email not exists");
      }

      await sendOtp(email);

      return email;
    },
    onSuccess: (email: string) => {
      dispatch(setEmail(email));
      onSuccess?.(email);
    },
  });
}

//check otp
export function useCheckOtp({ onSuccess }: UseHookOptions<void>) {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["checkOtp"],
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      await checkOtp(email, otp);
      return otp;
    },

    onSuccess: (otp: string) => {
      dispatch(setOtp(otp));
      onSuccess?.();
    },
  });
}
