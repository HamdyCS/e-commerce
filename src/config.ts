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
  },
};

export default config;
