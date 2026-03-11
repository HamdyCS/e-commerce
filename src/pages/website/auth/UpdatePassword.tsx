import { Helmet } from "@dr.pogodin/react-helmet";
import { useFormik } from "formik";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Button from "../../../components/ui/Button";
import FieldError from "../../../components/ui/FieldError";
import PasswordInput from "../../../components/ui/PasswordInput";
import type { UpdatePasswordDto } from "../../../dtos/UpdatePasswordDto";
import { useUpdatePassword } from "../../../hooks/auth";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters long")
    .max(10, "New password must be at most 10 characters long")
    .matches(/[A-Z]/, "New password must contain at least one uppercase letter")
    .matches(/[a-z]/, "New password must contain at least one lowercase letter")
    .matches(/[0-9]/, "New password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "New password must contain at least one special character",
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm password is required")
    .equals([Yup.ref("newPassword")], "Passwords do not match"),
});

export default function UpdatePassword() {
  const { t } = useTranslation();
  const { mutate, isPending, isError } = useUpdatePassword();
  const focusInput = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const updatePasswordDto: UpdatePasswordDto = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      mutate(updatePasswordDto);
    },
  });

  // focus on first input
  useEffect(() => {
    focusInput.current?.focus();
  }, []);

  return (
    <>
      <Helmet>
        <title>Update Password</title>
        <meta name="description" content="Update Password to E-commerce" />
        <meta name="keywords" content="update password, e-commerce, auth" />
      </Helmet>
      <div className="  space-y-4 w-full max-w-100 p-5 rounded-md overflow-hidden">
        <h2 className="text-[36px]">{t("Reset Password")}</h2>
        <AnimatePresence>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <PasswordInput
              id="oldPassword"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              placeholder={t("Current Password")}
              ref={focusInput}
            />

            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <FieldError error={formik.errors.oldPassword} />
            )}

            <PasswordInput
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              placeholder={t("New Password")}
            />

            {formik.touched.newPassword && formik.errors.newPassword && (
              <FieldError error={formik.errors.newPassword} />
            )}

            <PasswordInput
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              placeholder={t("Confirm New Password")}
            />

            {formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword && (
                <FieldError error={formik.errors.confirmNewPassword} />
              )}

            {isError && <FieldError error={t("Current password is wrong")} />}
            <Button
              type="submit"
              className="relative bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded-md cursor-pointer h-10 w-full"
              disabled={isPending}
              isLoading={isPending}
              text={t("Update Password")}
            />
          </form>
        </AnimatePresence>
      </div>
    </>
  );
}
