import { useRoutes } from "react-router-dom";
import "./App.css";
import WebsiteLayout from "./components/website/layout/WebsiteLayout";
import WebsiteRoutes from "./routes/website/WebsiteRoutes";
import DashboardLayout from "./components/dashboard/layout/DashboardLayout";
import DashboardRoutes from "./routes/dashboard/DashboardRoutes";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n]);

  const routes = useRoutes([
    {
      path: "/",
      element: <WebsiteLayout />, //layout for website
      children: WebsiteRoutes,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />, //layout for dashboard
      children: DashboardRoutes,
    },
  ]);

  return routes;
}
