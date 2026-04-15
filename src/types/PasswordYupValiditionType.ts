import * as Yup from "yup";

export default Yup.string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters long")
  .max(10, "Password must be at most 10 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character");
