import { type RouteObject } from "react-router-dom";
import RequireAuth from "../../../components/website/auth/RequireAuth";
import AuthLayout from "../../../components/website/layout/AuthLayout";
import ForgetPassword from "../../../pages/website/auth/ForgetPassword";
import Login from "../../../pages/website/auth/Login";
import SignUp from "../../../pages/website/auth/SignUp";
import UpdateEmail from "../../../pages/website/auth/UpdateEmail";
import UpdatePassword from "../../../pages/website/auth/UpdatePassword";
import RequireBack from "../../../components/website/auth/RequireGuest";

const AuthRoutes: RouteObject[] = [
  {
    path: "",
    element: <AuthLayout />,
    children: [
      // auth pages
      {
        element: <RequireBack />,
        children: [
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
        ],
      },

      // update auth info
      {
        element: <RequireAuth />,
        children: [
          {
            path: "update-email",
            element: <UpdateEmail />,
          },
          {
            path: "update-password",
            element: <UpdatePassword />,
          },
        ],
      },
    ],
  },
];

export default AuthRoutes;
