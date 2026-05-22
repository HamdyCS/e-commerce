import type { RouteObject } from "react-router-dom";
import CheckOut from "../../../pages/website/payments/CheckOut";
import RequireAuth from "../../../components/website/auth/RequireAuth";
import SuccessPayment from "../../../pages/website/payments/SuccessPayment";
import FailedPayment from "../../../pages/website/payments/FailedPayment";

const PaymentRoutes: RouteObject[] = [
  {
    path: "/checkout",
    element: <RequireAuth />,
    children: [
      {
        index: true,
        element: <CheckOut />,
      },
      {
        path: "success",
        element: <SuccessPayment />,
      },
      {
        path: "failed",
        element: <FailedPayment />,
      },
    ],
  },
];

export default PaymentRoutes;
