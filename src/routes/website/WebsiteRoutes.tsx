import type { RouteObject } from "react-router-dom";
import Home from "../../pages/website/Home";
import AuthRoutes from "./auth/AuthRoutes";
import NotFound from "../../pages/errors/NotFound";
import AccountRoutes from "./account/AccountRoutes";
import ProductRoutes from "./product/ProductRoutes";
import CategoryRoutes from "./category/CategoryRoutes";
import BrandRoutes from "./brands/BrandRoutes";

const WebsiteRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "about",
    element: <h1>About</h1>,
  },
  {
    path: "contact",
    element: <h1>Contact</h1>,
  },
  {
    path: "*",
    element: <NotFound />,
  },

  ...AuthRoutes,
  ...AccountRoutes,
  ...ProductRoutes,
  ...CategoryRoutes,
  ...BrandRoutes,
];

export default WebsiteRoutes;
