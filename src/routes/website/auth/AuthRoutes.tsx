import type { RouteObject } from "react-router-dom";
import SignUp from "../../../pages/website/auth/SignUp";
import Login from "../../../pages/website/auth/Login";
import ForgetPassword from "../../../pages/website/auth/ForgetPassword";

const AuthRoutes: RouteObject[] = [
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
];

export default AuthRoutes;
