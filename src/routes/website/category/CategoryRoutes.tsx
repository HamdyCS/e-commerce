import type { RouteObject } from "react-router-dom";
import SellerProductsInCategory from "../../../pages/website/categories/SellerProductsInCategory";

const CategoryRoutes: RouteObject[] = [
  {
    path: "categories/:id",
    element: <SellerProductsInCategory />,
  },
];

export default CategoryRoutes;
