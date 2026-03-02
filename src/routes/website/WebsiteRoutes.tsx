import type { RouteObject } from "react-router-dom";
import Home from "../../pages/website/Home";
import SignUp from "../../pages/website/auth/SignUp";
import Login from "../../pages/website/auth/Login";

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
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <h1>not found</h1>,
  },
];

export default WebsiteRoutes;
