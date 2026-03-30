import type { RouteObject } from "react-router-dom";
import Cart from "../../../pages/website/cart/Cart";

const CartRoutes: RouteObject[] = [
  {
    path: "cart",
    element: <Cart />,
  },
];

export default CartRoutes;
