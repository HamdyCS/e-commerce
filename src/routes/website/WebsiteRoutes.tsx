import type { RouteObject } from "react-router-dom";
import Home from "../../pages/website/Home";

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
    path: "*",
    element: <h1>not found</h1>,
  },
];

export default WebsiteRoutes;
