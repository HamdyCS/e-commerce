import React from "react";
import type { RouteObject } from "react-router-dom";
import SellerProduct from "../../../components/website/sellerProducts/SellerProduct";

const ProductRoutes: RouteObject[] = [
  {
    path: "seller-product/:id",
    element: <SellerProduct />,
  },
];

export default ProductRoutes;
