import { Helmet } from "@dr.pogodin/react-helmet";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import type { LoginDto } from "../../../dtos/LoginDto";
import { useLogin } from "../../../hooks/auth";
import Button from "../../ui/Button";
import FieldError from "../../ui/FieldError";
import LoginByProviders from "../auth/LoginByProviders";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must be at most 10 characters long"),
});

const initialValues: LoginDto = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const focusInput = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  //use Login hook
  const { mutate, isError, isPending } = useLogin();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  // focus on first input when component mounts
  useEffect(() => {
    focusInput.current?.focus();
  }, []);

  return (
    <div className="space-y-4 w-full p-5">
      <Helmet>
        <title>{t("Login")}</title>
        <meta name="description" content={t("Login to E-commerce")} />
        <meta name="keywords" content="login, e-commerce, auth" />
      </Helmet>
      <h2 className="text-[36px]">{t("Login to E-commerce")}</h2>
      <p className="text-[16px] text-black">{t("Enter your details below")}</p>
      <AnimatePresence>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-7 "
        >
          <input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("Email")}
            className="border-b border-gray-300 rounded-md p-2 w-full"
            ref={focusInput}
          />
          {formik.touched.email && formik.errors.email && (
            <FieldError error={formik.errors.email} />
          )}

          <div className=" p-2   w-full border-b border-gray-300 focus-within:outline-2 rounded-md flex items-center gap-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("Password")}
              className=" border-none focus:outline-none grow"
            />
            <FontAwesomeIcon
              cursor={"pointer"}
              onClick={() => setShowPassword((prev) => !prev)}
              className=""
              color={showPassword ? "black" : "gray"}
              icon={showPassword ? faEye : faEyeSlash}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <FieldError error={formik.errors.password} />
          )}
          <Link
            to="/forget-password"
            className="text-blue-500 hover:underline cursor-pointer min-h-10 text-start"
          >
            {t("Forget Password?")}
          </Link>

          {isError && <FieldError error={t("Invalid email or password")} />}
          <Button
            type="submit"
            className="relative bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded-md cursor-pointer h-10"
            disabled={isPending}
            isLoading={isPending}
            text={t("Login")}
          />
        </form>
      </AnimatePresence>

      <LoginByProviders />

      <p className="text-center">
        {t("Don't have an account?")}
        <Link to="/signup" className="font-bold ml-2">
          {t("Sign Up")}
        </Link>
      </p>
    </div>
  );
}
