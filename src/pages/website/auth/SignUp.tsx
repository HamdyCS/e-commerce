import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import signup from "../../../assets/images/signup.jpg";
import SignUpForm from "../../../components/website/forms/SignUpForm";
import SendOtp from "../../../components/website/otp/SendOtp";
import { useTranslation } from "react-i18next";
import CheckOtp from "../../../components/website/otp/CheckOtp";

export default function SignUp() {
  //1- send otp, 2- check otp, 3- sign up
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  return (
    <div className="flex ">
      <img
        src={signup}
        alt={t("signup")}
        className="w-1/2 h-150 hidden lg:block self-center"
      />
      <div className="lg:w-1/2 w-full flex items-center justify-center">
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
              <SendOtp afterSend={() => setStep(2)} />
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
          {step === 3 && (
            <motion.div
              className="w-full max-w-100"
              key="sign-up"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SignUpForm onChangeEmail={() => setStep(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
