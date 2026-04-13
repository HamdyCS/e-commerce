import { Navigate, type RouteObject } from "react-router-dom";
import MyAccountLayout from "../../../components/website/layout/MyAccountLayout";
import RequireAuth from "../../../components/website/auth/RequireAuth";
import Profile from "../../../pages/website/auth/Profile";
import Addresses from "../../../pages/website/Addresses/Addresses";

const MyAccountRoutes: RouteObject[] = [
  // manage account
  {
    element: <RequireAuth />,
    children: [
      {
        path: "my-account",
        element: <MyAccountLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "addresses",
            element: <Addresses />,
          },
        ],
      },
    ],
  },
];

export default MyAccountRoutes;
