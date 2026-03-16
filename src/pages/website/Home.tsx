import { Helmet } from "@dr.pogodin/react-helmet";
import { useTranslation } from "react-i18next";
import CategoriesList from "../../components/website/categories/CategoriesList";
import BannersSwiper from "../../components/website/swiper/BannersSwiper";
import CategorySwiper from "../../components/website/swiper/CategorySwiper";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="space-y-20">
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
      <div className="flex  gap-10">
        <div className="hidden lg:block">
          <CategoriesList number={1} />
        </div>
        <div className="min-w-0 grow">
          <BannersSwiper />
        </div>
      </div>
      <CategorySwiper />
    </div>
  );
}
