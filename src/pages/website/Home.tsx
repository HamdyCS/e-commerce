import { Helmet } from "@dr.pogodin/react-helmet";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import CategoriesList from "../../components/website/categories/CategoriesList";
import Features from "../../components/website/Features";
import SellerProducts from "../../components/website/sellerProducts/SellerProducts";
import BannerSwiper from "../../components/website/swiper/BannerSwiper";
import BrandSwiper from "../../components/website/swiper/BrandSwiper";
import CategorySwiper from "../../components/website/swiper/CategorySwiper";
import { useGetAllSellerProducts } from "../../hooks/sellerProduct";

export default function Home() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetAllSellerProducts(10);

  const sellerProducts = useMemo(() => {
    return data?.pages.flatMap((s) => s.data);
  }, [data]);

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
          <BannerSwiper />
        </div>
      </div>
      <div>
        <CategorySwiper />
        <div className="border-b mt-9 border-b-black/20 dark:border-b-white/20" />
      </div>
      <div>
        <Features />
        <div className="border-b mt-9 border-b-black/20 dark:border-b-white/20" />
      </div>
      <div>
        <BrandSwiper />
        <div className="border-b mt-9 border-b-black/20 dark:border-b-white/20" />
      </div>
      <div>
        <SellerProducts
          data={sellerProducts}
          handleFetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}
