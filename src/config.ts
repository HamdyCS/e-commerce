const API_URL = import.meta.env.VITE_API_URL;

const config = {
  baseUrl: API_URL,
  auth: {
    otp: {
      send: "authentication/send-otp",
      check: "authentication/is-otp-valid",
    },
    signUp: "authentication/register-customer",
    isEmailExist: "authentication/is-email-exist",
    login: "authentication/login",
    googleLogin: "authentication/login/customer/google",
    githubLogin: "authentication/login/customer/github",
    returnUrl: "http://localhost:5173/",
  },
};

export default config;
