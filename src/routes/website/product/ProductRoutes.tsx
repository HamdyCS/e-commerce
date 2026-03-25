import type { RouteObject } from "react-router-dom";
import SellerProduct from "../../../pages/website/sellerProducts/SellerProduct";

const ProductRoutes: RouteObject[] = [
  {
    path: "seller-product/:id",
    element: <SellerProduct />,
  },
];

export default ProductRoutes;
