import { Helmet } from "@dr.pogodin/react-helmet";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t("Home")}</title>
        <meta
          name="description"
          content={t(
            "Shop e-commerce for electronics, fashion, home essentials, and more. Enjoy great prices, exclusive deals, and fast delivery on millions of items. Your one-stop shop for everything you need",
          )}
        />
        <meta name="keywords" content="home, e-commerce" />
      </Helmet>
      {t("Home")}
    </div>
  );
}
