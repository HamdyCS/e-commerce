import { Helmet } from "@dr.pogodin/react-helmet";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import CheckOtp from "../../../components/website/auth/otp/CheckOtp";
import SendOtp from "../../../components/website/auth/otp/SendOtp";
import type UpdateEmailDto from "../../../dtos/UpdateEmailDto";
import { useUpdateEmail } from "../../../hooks/auth";
import { useAppSelector } from "../../../redux/hook/reduxHooks";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/loading/Spinner";

export default function UpdateEmail() {
  //1- send otp, 2- check otp, 3- update email
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

  const { mutate, isPending } = useUpdateEmail({
    onSuccess: () => toast.success(t("Updated Email successfuly")),
    onError: () => toast.error(t("An error occurred while updating the email")),
  });

  const { otp, email } = useAppSelector((state) => state.otp);

  //mutate
  useEffect(() => {
    if (step !== 3) return;

    const updateEmailDto: UpdateEmailDto = {
      email: email,
      otp: otp,
    };

    mutate(updateEmailDto);
  }, [step]);

  return (
    <>
      <Helmet>
        <title>Update Email</title>
        <meta name="description" content="Sign Up to E-commerce" />
        <meta name="keywords" content="sign up, e-commerce, auth" />
      </Helmet>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            className="w-full max-w-100"
            key="send-otp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SendOtp type="updateEmail" afterSend={() => setStep(2)} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            className="w-full max-w-100"
            key="check-otp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CheckOtp onContinue={() => setStep(3)} />
          </motion.div>
        )}
      </AnimatePresence>
      {step === 3 && isPending && (
        <div className="relative">
          <Spinner showOverlay={false} size="40" color="blue" />
        </div>
      )}
    </>
  );
}
