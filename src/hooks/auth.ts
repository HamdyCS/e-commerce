import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type ForgetPasswordDto from "../dtos/ForgetPasswordDto";
import type { LoginDto } from "../dtos/LoginDto";
import type { SignUpDto } from "../dtos/SignUpDto";
import type UpdateEmailDto from "../dtos/UpdateEmailDto";
import type { UpdatePasswordDto } from "../dtos/UpdatePasswordDto";
import type UserDto from "../dtos/UserDto";
import { useAppDispatch, useAppSelector } from "../redux/hook/reduxHooks";
import { setAuthUser, setAuthUserEmail } from "../redux/slices/authSlice";
import { setEmail, setOtp } from "../redux/slices/signUpSlice";
import {
  isEmailExist,
  login,
  resetPassword,
  signUp,
  updateEmail,
  updateInfo,
  updatePassword,
} from "../services/authService";
import { checkOtp, sendOtp } from "../services/otpService";
import type { UseHookOptions } from "./types/UseHookOptions";
import type { UseSendOtpOptions } from "./types/UseSendOtpOptions";
import toast from "react-hot-toast";
import { t } from "i18next";
import type CartDto from "../dtos/CartDto";
import { setCart } from "../redux/slices/cartSlice";

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
  const cart = useAppSelector((state) => state.cart);

  //userDto & cart => Data type
  //AxiosError => Error type
  //LoginDto & cart => Variables type (mutationFn parameter)
  return useMutation<
    {
      user: UserDto | null;
      cart: CartDto | null;
    },
    AxiosError,
    LoginDto
  >({
    mutationKey: ["login"],
    mutationFn: (data) => {
      if (cart.cart) {
        return login(data, cart.cart);
      }
      return login(data);
    },
    onSuccess: (data) => {
      if (data.user) {
        dispatch(setAuthUser(data.user));
      }
      if (data.cart) {
        dispatch(setCart(data.cart));
      }
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

      if (isExist && (type === "signUp" || type === "updateEmail")) {
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
      toast.success(t("Updated Password successfuly"));
      navigate("/my-account/profile");
    },
    onError: () => {
      toast.error(t("An error occurred while updating the password"));
      navigate("/my-account/profile");
    },
  });
}

//update email
export function useUpdateEmail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation<string, AxiosError, UpdateEmailDto>({
    mutationKey: ["updateEmail"],
    mutationFn: async (data: UpdateEmailDto) => {
      await updateEmail(data);
      return data.email;
    },
    onSuccess: (email) => {
      dispatch(setAuthUserEmail(email));
      toast.success(t("Updated Email successfuly"));
      navigate("/my-account/profile");
    },
    onError: () => {
      toast.error(t("An error occurred while updating the email"));
      navigate("/my-account/profile");
    },
  });
}
