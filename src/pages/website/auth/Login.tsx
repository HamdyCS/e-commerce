import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../../../components/website/forms/LoginForm";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function SignUp() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to E-commerce" />
        <meta name="keywords" content="login, e-commerce, auth" />
      </Helmet>
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
    </>
  );
}
