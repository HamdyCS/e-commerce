import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../../../components/website/forms/LoginForm";

export default function SignUp() {
  return (
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
  );
}
