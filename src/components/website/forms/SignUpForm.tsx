import { useFormik } from "formik";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import type { SignUpDto } from "../../../dtos/SignUpDto";
import { useRegister } from "../../../hooks/auth";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import Button from "../../ui/Button";
import FieldError from "../../ui/FieldError";
import Input from "../../ui/Input";
import PasswordInput from "../../ui/PasswordInput";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  dateOfBirth: Yup.string()
    .required("Date of Birth is required")
    .test("is-18", "You must be at least 18 years old", (value) => {
      const today = new Date();
      const birthDate = new Date(value);

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 18;
    }),
  phoneNumber: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must be at most 10 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .equals([Yup.ref("password")], "Passwords do not match"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

interface SignUpFormProps {
  onChangeEmail: () => void;
}

export default function SignUpForm({ onChangeEmail }: SignUpFormProps) {
  const { email, otp } = useAppSelector((state) => state.otp);

  const focusInput = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  const { mutate, isError, isPending } = useRegister();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      const data: SignUpDto = {
        Otp: otp,
        userDto: {
          FirstName: values.firstName,
          LastName: values.lastName,
          DateOfBirth: values.dateOfBirth,
          PhoneNumber: values.phoneNumber,
          Email: email,
          Password: values.password,
        },
      };
      mutate(data);
    },
  });

  // focus on first input when component mounts
  useEffect(() => {
    focusInput.current?.focus();
  }, []);

  return (
    <div className="space-y-4 w-full p-5">
      <h2 className="text-[36px]">{t("Create Account")}</h2>
      <p className="text-[16px] text-black">{t("Enter your details below")}</p>
      <AnimatePresence>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-7 "
        >
          <Input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder={t("First Name")}
            ref={focusInput}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <FieldError error={formik.errors.firstName} />
          )}
          <Input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("Last Name")}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <FieldError error={formik.errors.lastName} />
          )}
          <Input
            type="date"
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            placeholder={t("Date of Birth")}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <FieldError error={formik.errors.dateOfBirth} />
          )}
          <Input
            type="text"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            placeholder={t("Phone Number")}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <FieldError error={formik.errors.phoneNumber} />
          )}
          <Input
            id="email"
            type="email"
            value={email}
            name="email"
            disabled
            placeholder={t("Email")}
          />
          <button
            type="button"
            className="text-blue-500 hover:underline cursor-pointer min-h-10"
            onClick={onChangeEmail}
          >
            {t("Change Email")}
          </button>

          <PasswordInput
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("Password")}
          />

          {formik.touched.password && formik.errors.password && (
            <FieldError error={formik.errors.password} />
          )}

          <PasswordInput
            id="confirm-password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t("Confirm Password")}
          />

          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <FieldError error={formik.errors.confirmPassword} />
          )}
          {isError && <FieldError error={t("Something went wrong")} />}
          <Button
            type="submit"
            className="relative bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded-md cursor-pointer h-10"
            disabled={isPending}
            isLoading={isPending}
            text={t("Sign Up")}
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
