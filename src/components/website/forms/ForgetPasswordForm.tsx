import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import type ForgetPasswordDto from "../../../dtos/ForgetPasswordDto";
import { useResetPassword } from "../../../hooks/auth";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import Button from "../../ui/Button";
import FieldError from "../../ui/FieldError";
import Input from "../../ui/Input";
import PasswordYupValiditionType from "../../../types/PasswordYupValiditionType";

interface formType {
  newPassword: "";
  confirmPassword: "";
}

const initialValues: formType = {
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  newPassword: PasswordYupValiditionType,
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .equals([Yup.ref("newPassword")], "Passwords do not match"),
});

export default function ForgetPasswordForm() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { email, otp } = useAppSelector((state) => state.otp);

  const { mutate, isPending, isError } = useResetPassword();

  const focusInput = useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: formType) => {
      const data: ForgetPasswordDto = {
        Password: values.newPassword,
        Email: email,
        Otp: otp,
      };
      mutate(data);
    },
  });

  // focus on first input
  useEffect(() => {
    focusInput.current?.focus();
  }, []);
  return (
    <div className="  space-y-4 w-full max-w-100 p-5 rounded-md overflow-hidden">
      <h2 className="text-[36px]">{t("Reset Password")}</h2>
      <AnimatePresence>
        <form onSubmit={formik.handleSubmit} className="space-y-7">
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              placeholder={t("Password")}
            />
            <FontAwesomeIcon
              cursor={"pointer"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500"
              icon={showPassword ? faEye : faEyeSlash}
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <FieldError error={formik.errors.newPassword} />
          )}

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              placeholder={t("Confirm Password")}
            />
            <FontAwesomeIcon
              cursor={"pointer"}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500"
              icon={showConfirmPassword ? faEye : faEyeSlash}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <FieldError error={formik.errors.confirmPassword} />
          )}
          {isError && <FieldError error={t("Something went wrong")} />}

          <Button
            type="submit"
            className="relative bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded-md cursor-pointer h-10 w-full"
            disabled={isPending}
            isLoading={isPending}
            text={t("Reset Password")}
          />
        </form>
      </AnimatePresence>

      <p className="text-center">
        {t("Already have an account?")}
        <Link to="/login" className="font-bold ml-2">
          {t("Login")}
        </Link>
      </p>
    </div>
  );
}
