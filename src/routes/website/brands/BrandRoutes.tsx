import type { RouteObject } from "react-router-dom";
import SellerProductsInBrand from "../../../pages/website/brands/SellerProductsInBrand";

const BrandRoutes: RouteObject[] = [
  {
    path: "brands/:id",
    element: <SellerProductsInBrand />,
  },
];

export default BrandRoutes;
