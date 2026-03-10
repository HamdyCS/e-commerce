import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import CheckOtp from "../../../components/website/auth/otp/CheckOtp";
import SendOtp from "../../../components/website/auth/otp/SendOtp";
import ForgetPasswordForm from "../../../components/website/forms/ForgetPasswordForm";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function ForgetPassword() {
  //1- send otp, 2- check otp, 3- forget password
  const [step, setStep] = useState(1);
  return (
    <>
      <Helmet>
        <title>Forget Password</title>
        <meta name="description" content="Forget Password to E-commerce" />
        <meta name="keywords" content="forget password, e-commerce, auth" />
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
            <SendOtp type="forgetPassword" afterSend={() => setStep(2)} />
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
            <ForgetPasswordForm />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
