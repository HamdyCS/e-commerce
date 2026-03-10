import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useSendOtp } from "../../../../hooks/auth";
import Button from "../../../ui/Button";
import FieldError from "../../../ui/FieldError";
import Input from "../../../ui/Input";
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
  const focusInput = useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: (values) => mutate(values.email),
  });

  const { mutate, isPending, isError, error } = useSendOtp({
    type,
    onSuccess: afterSend,
  });

  const { t } = useTranslation();

  //focus on email input
  useEffect(() => {
    focusInput.current?.focus();
  }, []);

  return (
    <div className="  space-y-4 w-full max-w-100 p-5 rounded-md overflow-hidden">
      <h2 className="text-[36px]">{t("Send OTP")}</h2>
      <AnimatePresence>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="email"
            placeholder={t("Email")}
            className=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            ref={focusInput}
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
