import type { RouteObject } from "react-router-dom";
import Home from "../../pages/website/Home";
import AuthRoutes from "./auth/AuthRoutes";
import NotFound from "../../pages/errors/NotFound";
import MyAccountRoutes from "./account/MyAccountRoutes";
import ProductRoutes from "./product/ProductRoutes";
import CategoryRoutes from "./category/CategoryRoutes";
import BrandRoutes from "./brands/BrandRoutes";
import CartRoutes from "./cart/CartRoutes";
import GetActiveCart from "../../components/website/cart/GetActiveCart";

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
  ...MyAccountRoutes,
  ...ProductRoutes,
  ...CategoryRoutes,
  ...BrandRoutes,
  ...CartRoutes,
];

const WebsiteRoutesWithCart: RouteObject = {
  element: <GetActiveCart />,
  children: WebsiteRoutes,
};

export default [WebsiteRoutesWithCart];
