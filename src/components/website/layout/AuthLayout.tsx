import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import signup from "../../../assets/images/signup.jpg";

export default function AuthLayout() {
  const { t } = useTranslation();
  return (
    <div className="flex ">
      <img
        src={signup}
        alt={t("signup")}
        className="w-1/2 h-150 hidden lg:block self-center"
      />
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className="w-full max-w-110">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
