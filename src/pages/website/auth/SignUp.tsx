import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import CheckOtp from "../../../components/website/auth/otp/CheckOtp";
import SendOtp from "../../../components/website/auth/otp/SendOtp";
import SignUpForm from "../../../components/website/forms/SignUpForm";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function SignUp() {
  //1- send otp, 2- check otp, 3- sign up
  const [step, setStep] = useState(1);
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
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
            <SendOtp type="signUp" afterSend={() => setStep(2)} />
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
    </>
  );
}
