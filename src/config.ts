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
    forgetPassword: "authentication/reset-password",
    getAuthUser: "authentication",
    refreshToken: "authentication/refresh-token",
    updateInfo: "authentication",
    updatePassword: "authentication/update-password",
    updateEmail: "authentication/update-email",
  },
  category: {
    getAll: "product-categories/all-paged",
  },
  brand: {
    getAll: "brands/all-paged",
  },
  banner: {
    getAllActive: "banners/all/active",
  },
  sellerProduct: {
    getAll: "seller-products",
    getById: "seller-products",
    getBySubCategoryId: "seller-products/sub-categories",
  },
};

export default config;
