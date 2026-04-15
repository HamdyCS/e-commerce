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
    logout: "authentication/logout",
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
    getByCategoryId: "seller-products/categories",
    getByBrandId: "seller-products/brands",
  },
  cart: {
    getActive: "shopping-carts/active",
    addToCart: (cartId: number) => `shopping-carts/${cartId}/seller-products`,
    addItemsToCart: (cartId: number) =>
      `shopping-carts/${cartId}/seller-products/bulk`,
    deleteItemFromCart: (cartId: number) =>
      `shopping-carts/${cartId}/seller-products`,
  },
  city: {
    getAll: "cities/all",
  },
  address: {
    getAll: "user-addresses/all",
    getById: "user-addresses",
    addNew: "user-addresses",
    update: "user-addresses",
    delete: "user-addresses",
  },
};

export default config;
