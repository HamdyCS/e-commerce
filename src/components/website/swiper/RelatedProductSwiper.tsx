import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CustomSkeletonTheme from "../../ui/CustomSkeletonTheme";
import SectionHeader from "../../ui/SectionHeader";
import logo from "../../../assets/logo.png";
import { useGetSellerProductsBySubCategoryId } from "../../../hooks/sellerProduct";
import SellerProductCard from "../sellerProducts/SellerProductCard";

interface RelatedSellerProductSwiperProps {
  productSubCategoryId: string;
}

export default function RelatedSellerProductSwiper({
  productSubCategoryId,
}: RelatedSellerProductSwiperProps) {
  const { data, isLoading } = useGetSellerProductsBySubCategoryId(
    Number(productSubCategoryId),
    10,
  );

  const { t, i18n } = useTranslation();

  const sellerProducts = data?.pages.flatMap((page) => page.data);

  const skeletonElements = Array.from({ length: 7 }, (_, i) => (
    <Skeleton key={i} width={170} height={200} />
  ));

  return (
    <div className="overflow-hidden">
      <SectionHeader title={t("Related Products")} />
      <div className="mt-5 flex items-center justify-between">
        {!isLoading && (
          <div className="w-full  justify-end custom-controller flex items-center gap-3">
            <button
              className="custom-seller-product-prev bg-card-light dark:bg-card-dark cursor-pointer"
              title={t("Previous")}
            >
              <FontAwesomeIcon icon={faLeftLong} className="hover:text-hover" />
            </button>
            <button
              className="custom-seller-product-next bg-card-light dark:bg-card-dark cursor-pointer"
              title={t("Next")}
            >
              <FontAwesomeIcon
                icon={faRightLong}
                className="hover:text-hover"
              />
            </button>
          </div>
        )}
        {isLoading && (
          <div className="flex items-center gap-3">
            <Skeleton width={20} height={20} />
            <Skeleton width={20} height={20} />
          </div>
        )}
      </div>

      {isLoading && (
        <div className="mt-10 flex items-center justify-between flex-wrap gap-1">
          <CustomSkeletonTheme>{skeletonElements}</CustomSkeletonTheme>
        </div>
      )}

      {!isLoading && (
        <Swiper
          key={i18n.language}
          dir={i18n.language === "en" ? "ltr" : "rtl"}
          className="mt-10 p-5!"
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-seller-product-next",
            prevEl: ".custom-seller-product-prev",
          }}
          spaceBetween={20}
          breakpoints={{
            // Mobile Horizontal / Tablets
            480: { slidesPerView: 1, spaceBetween: 20 },
            // Tablets / Laptops
            768: { slidesPerView: 2, spaceBetween: 20 },
            // Desktop
            1024: { slidesPerView: 3, spaceBetween: 20 },
            // Large Desktop
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
          speed={1000} // سرعة التحريك
        >
          {sellerProducts?.map((sellerProduct) => (
            <SwiperSlide key={sellerProduct.id}>
              <SellerProductCard sellerProduct={sellerProduct} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
