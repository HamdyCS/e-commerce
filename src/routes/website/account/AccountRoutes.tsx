import { Navigate, type RouteObject } from "react-router-dom";
import MyAccount from "../../../components/website/auth/MyAccount";
import RequireAuth from "../../../components/website/auth/RequireAuth";
import Profile from "../../../pages/website/auth/Profile";

const AccountRoutes: RouteObject[] = [
  // manage account
  {
    element: <RequireAuth />,
    children: [
      {
        path: "my-account",
        element: <MyAccount />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default AccountRoutes;
