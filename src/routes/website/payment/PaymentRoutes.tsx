import type { RouteObject } from "react-router-dom";
import CheckOut from "../../../pages/website/payments/CheckOut";
import RequireAuth from "../../../components/website/auth/RequireAuth";

const PaymentRoutes: RouteObject[] = [
  {
    path: "/checkout",
    element: <RequireAuth />,
    children: [
      {
        index: true,
        element: <CheckOut />,
      },
    ],
  },
];

export default PaymentRoutes;
