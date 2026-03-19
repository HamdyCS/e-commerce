import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="bg-black dark:bg-secondary-dark-bg ">
      <div className=" container mx-auto px-2 py-10 text-white flex flex-wrap items-center justify-between gap-10 text-[20px] select-none">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl ">E-Commerce</h1>
          <Link className="block hover:underline underline-offset-2" to={"/"}>
            {t("Home")}
          </Link>
          <Link
            className="block hover:underline underline-offset-2"
            to={"/contant"}
          >
            {t("Contant")}
          </Link>
          <Link
            className="block hover:underline underline-offset-2"
            to={"/about"}
          >
            {t("About")}
          </Link>
        </div>
        <div className="space-y-4  select-text">
          <h2 className=" text-2xl select-none">{t("Support")}</h2>
          <p>{t("73 Road 15, Maadi Sarayat, Cairo, 11728, Egypt")}</p>
          <p>e-commerce.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className="space-y-4">
          <h2 className=" text-2xl ">{t("Shopping")}</h2>
          <Link
            className="block hover:underline underline-offset-2"
            to={"/cart"}
          >
            {t("Cart")}
          </Link>
          <Link
            className="block hover:underline underline-offset-2"
            to={"/categories"}
          >
            {t("Categories")}
          </Link>
          <Link
            className="block hover:underline underline-offset-2"
            to={"/products"}
          >
            {t("Products")}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://www.facebook.com/" className="hover:text-blue-300">
            <FacebookRoundedIcon />
          </a>
          <a href="https://www.youtube.com/" className="hover:text-blue-300">
            <YouTubeIcon />
          </a>
          <a href="https://www.whatsapp.com/" className="hover:text-blue-300">
            <WhatsAppIcon className="hover:" />
          </a>
        </div>
      </div>
    </div>
  );
}
