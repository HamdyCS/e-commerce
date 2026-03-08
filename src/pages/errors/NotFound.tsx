import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="w-full min-h-[inherit] flex items-center justify-center flex-col gap-5">
      <p className="text-[30px] md:text-[50px] xl:text-[110px] text-nowrap">
        {t("404 Not Found")}
      </p>
      <p className="text-center">
        {t("Your visited page not found. You may go home page.")}
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn bg-[#DB4444] text-white px-6 py-3 rounded-md cursor-pointer"
      >
        {t("Back to home page")}
      </button>
    </div>
  );
}
