import { Navigate, type RouteObject } from "react-router-dom";
import MyAccountLayout from "../../../components/website/layout/MyAccountLayout";
import RequireAuth from "../../../components/website/auth/RequireAuth";
import Profile from "../../../pages/website/auth/Profile";
import Addresses from "../../../pages/website/Addresses/Addresses";
import Orders from "../../../pages/website/orders/Orders";
import ReturnOrders from "../../../pages/website/orders/ReturnOrders";
import OrderDetailes from "../../../pages/website/orders/OrderDetailes";

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
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/returned",
            element: <ReturnOrders />,
          },
          {
            path: "orders/:orderId",
            element: <OrderDetailes />,
          },
        ],
      },
    ],
  },
];

export default MyAccountRoutes;
