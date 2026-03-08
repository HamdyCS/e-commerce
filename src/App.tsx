import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRoutes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/dashboard/layout/DashboardLayout";
import WebsiteLayout from "./components/website/layout/WebsiteLayout";
import DashboardRoutes from "./routes/dashboard/DashboardRoutes";
import WebsiteRoutes from "./routes/website/WebsiteRoutes";
import AuthProvider from "./components/website/auth/AuthProvider";

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

  return <AuthProvider>{routes}</AuthProvider>;
}
