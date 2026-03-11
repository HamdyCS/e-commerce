import { Navigate, type RouteObject } from "react-router-dom";
import SignUp from "../../../pages/website/auth/SignUp";
import Login from "../../../pages/website/auth/Login";
import ForgetPassword from "../../../pages/website/auth/ForgetPassword";
import AuthLayout from "../../../components/website/layout/AuthLayout";
import MyAccount from "../../../components/website/auth/MyAccount";
import Profile from "../../../pages/website/auth/Profile";
import UpdateEmail from "../../../pages/website/auth/UpdateEmail";
import UpdatePassword from "../../../pages/website/auth/UpdatePassword";

const AuthRoutes: RouteObject[] = [
  {
    path: "",
    element: <AuthLayout />,
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
  {
    path: "my-account",
    element: <MyAccount />,
    children: [
      {
        path: "",
        element: <Navigate to="profile" />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

export default AuthRoutes;
