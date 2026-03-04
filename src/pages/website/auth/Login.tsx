import { useTranslation } from "react-i18next";
import signup from "../../../assets/images/signup.jpg";
import LoginForm from "../../../components/website/forms/LoginForm";
import { AnimatePresence, motion } from "framer-motion";

export default function SignUp() {
  const { t } = useTranslation();
  return (
    <div className="flex ">
      <img
        src={signup}
        alt={t("signup")}
        className="w-1/2 h-150 hidden lg:block self-center"
      />
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className="w-full max-w-110">
          <AnimatePresence>
            <motion.div
              key="login"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <LoginForm />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
