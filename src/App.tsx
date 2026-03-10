import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRoutes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/dashboard/layout/DashboardLayout";
import WebsiteLayout from "./components/website/layout/WebsiteLayout";
import DashboardRoutes from "./routes/dashboard/DashboardRoutes";
import WebsiteRoutes from "./routes/website/WebsiteRoutes";
import AuthProvider from "./components/website/auth/AuthProvider";
import { useAppSelector } from "./redux/hook/reduxHooks";

export default function App() {
  const { i18n } = useTranslation();
  const { theme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
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

  return (
    <AuthProvider>
      <div className="dark:bg-primary-dark-bg! text-primary-text-dark! dark:text-primary-text-light!">
        {routes}
      </div>
    </AuthProvider>
  );
}
