import type { RouteObject } from "react-router-dom";

const DashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <h1>Dashboard</h1>,
  },
  {
    path: "products",
    element: <h1>Products</h1>,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
];

export default DashboardRoutes;
