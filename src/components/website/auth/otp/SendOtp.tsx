import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "../../../../redux/hook/reduxHooks";
import { setEmail } from "../../../../redux/slices/signUpSlice";
import { isEmailExist } from "../../../../services/authService";
import { sendOtp } from "../../../../services/otpService";
import Button from "../../../ui/Button";
import FieldError from "../../../ui/FieldError";
import LoginByProviders from "../LoginByProviders";

interface SendOtpProps {
  afterSend: () => void;
  type: "signUp" | "forgetPassword";
}

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

export default function SendOtp({ afterSend, type }: SendOtpProps) {
  const dispatch = useAppDispatch();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: (values) => mutate(values.email),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handelMutate,
    onSuccess: () => {
      afterSend();
    },
  });

  const { t } = useTranslation();

  //focus on email input
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  //handel mutate
  async function handelMutate(email: string) {
    const isExist = await isEmailExist(email);

    if (isExist && type === "signUp") {
      throw new Error("Email already exists");
    } else if (!isExist && type === "forgetPassword") {
      throw new Error("Email not exists");
    }

    await sendOtp(email);

    dispatch(setEmail(email));
  }

  return (
    <div className="  space-y-4 w-full max-w-100 p-5 rounded-md overflow-hidden">
      <h2 className="text-[36px]">{t("Send OTP")}</h2>
      <AnimatePresence>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder={t("Email")}
            className="border-b border-gray-300 rounded-md p-2 block w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            ref={emailInputRef}
          />
          {formik.touched.email && formik.errors.email && (
            <FieldError error={formik.errors.email} />
          )}
          {isError && <FieldError error={error?.message} />}
          <div className="flex flex-col gap-4">
            <Button
              className=" relative bg-blue-500 text-white p-2 rounded-md cursor-pointer block min-h-10"
              isLoading={isPending}
              text={t("send")}
              type="submit"
              disabled={isPending}
            />
          </div>
        </form>
      </AnimatePresence>

      <LoginByProviders />

      <p className="text-center">
        {t("Already have an account?")}
        <Link to="/login" className="font-bold ml-2">
          {t("Login")}
        </Link>
      </p>
    </div>
  );
}
