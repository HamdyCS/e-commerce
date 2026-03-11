import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { LoginDto } from "../dtos/LoginDto";
import { useAppDispatch } from "../redux/hook/reduxHooks";
import { setAuthUser } from "../redux/slices/authSlice";
import { setEmail, setOtp } from "../redux/slices/signUpSlice";
import {
  isEmailExist,
  login,
  resetPassword,
  signUp,
  updateInfo,
  updatePassword,
} from "../services/authService";
import { checkOtp, sendOtp } from "../services/otpService";
import type { UseSendOtpOptions } from "./types/UseSendOtpOptions";
import type { UseHookOptions } from "./types/UseHookOptions";
import type ForgetPasswordDto from "../dtos/ForgetPasswordDto";
import type { SignUpDto } from "../dtos/SignUpDto";
import type UserDto from "../dtos/UserDto";
import type { UpdatePasswordDto } from "../dtos/UpdatePasswordDto";

//register
export function useRegister() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<UserDto, AxiosError, SignUpDto>({
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

  return useMutation<any, AxiosError, ForgetPasswordDto>({
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

//update info
export function useUpdateInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["updateInfo"],
    mutationFn: updateInfo,
    onSuccess: (data) => {
      dispatch(setAuthUser(data));
      navigate("/");
    },
  });
}

//update password
export function useUpdatePassword() {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, UpdatePasswordDto>({
    mutationKey: ["updatePassword"],
    mutationFn: updatePassword,
    onSuccess: () => {
      navigate("/my-account/profile");
    },
  });
}
