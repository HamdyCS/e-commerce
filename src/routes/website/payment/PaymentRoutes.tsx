import type { RouteObject } from "react-router-dom";
import CheckOut from "../../../pages/website/payments/CheckOut";
import RequireAuth from "../../../components/website/auth/RequireAuth";
import SuccessPayment from "../../../pages/website/payments/SuccessPayment";
import FailedPayment from "../../../pages/website/payments/FailedPayment";
import PaymentVerificatio from "../../../pages/website/payments/PaymentVerificatio";

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
      {
        path: "verify",
        element: <PaymentVerificatio />,
      },
    ],
  },
];

export default PaymentRoutes;
