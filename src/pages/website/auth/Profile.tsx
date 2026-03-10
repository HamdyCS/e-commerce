import { useFormik } from "formik";
import type UpdateInfoDto from "../../../dtos/UpdateInfoDto";
import { useUpdateInfo } from "../../../hooks/auth";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import * as Yup from "yup";
import { AnimatePresence } from "motion/react";
import Input from "../../../components/ui/Input";
import FieldError from "../../../components/ui/FieldError";
import { useTranslation } from "react-i18next";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  dateOfBirth: Yup.date()
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
});

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const { mutate, isPending, isError } = useUpdateInfo();

  const { t } = useTranslation();

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateOfBirth: user?.dateOfBirth.split("T")[0],
    phoneNumber: user?.phoneNumber,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      const data: UpdateInfoDto = {
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        dateOfBirth: values.dateOfBirth || "",
        phoneNumber: values.phoneNumber || "",
      };

      mutate(data);
    },
  });

  return (
    <div className="space-y-4 p-5 w-full max-w-150">
      <h2 className="text-2xl font-bold">{t("Edit Profile")}</h2>
      <AnimatePresence>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-7 "
        >
          <div className="flex gap-4">
            <div className="space-y-7">
              <Input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder={t("First Name")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <FieldError error={formik.errors.firstName} />
              )}
            </div>
            <div className="space-y-7">
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
            </div>
          </div>
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
            value={user?.email}
            name="email"
            disabled
            placeholder={t("Email")}
          />
          <div className="flex justify-between flex-wrap">
            <Link
              to="/auth/update-email"
              className="text-blue-500 hover:underline cursor-pointer min-h-10"
            >
              {t("Update Email")}
            </Link>
            <Link
              to="/auth/update-password"
              className="text-blue-500 hover:underline cursor-pointer min-h-10"
            >
              {t("Update Password")}
            </Link>
          </div>
          {isError && <FieldError error={t("Something went wrong")} />}
          <Button
            type="submit"
            className="relative bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded-md cursor-pointer h-10"
            disabled={isPending}
            isLoading={isPending}
            text={t("Update")}
          />
        </form>
      </AnimatePresence>
    </div>
  );
}
