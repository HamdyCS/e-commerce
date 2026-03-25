import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllCategories } from "../../../hooks/category";
import CustomSkeletonTheme from "../../ui/CustomSkeletonTheme";
import SectionHeader from "../../ui/SectionHeader";
import logo from "../../../assets/logo.png";

export default function CategorySwiper() {
  const { data, isLoading } = useGetAllCategories({
    pageNumber: 1,
    pageSize: 100,
  });

  const { t, i18n } = useTranslation();

  const skeletonElements = Array.from({ length: 7 }, (_, i) => (
    <Skeleton key={i} width={170} height={200} />
  ));

  return (
    <div className="">
      <SectionHeader title={t("Categories")} />
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-bold text-[36px]">{t("Browse By Category")}</h2>
        {!isLoading && (
          <div className="custom-controller flex items-center gap-3">
            <button
              className="custom-banner-prev bg-card-light dark:bg-card-dark cursor-pointer"
              title={t("Previous")}
            >
              <FontAwesomeIcon icon={faLeftLong} className="hover:text-hover" />
            </button>
            <button
              className="custom-banner-next bg-card-light dark:bg-card-dark cursor-pointer"
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
            nextEl: ".custom-banner-next",
            prevEl: ".custom-banner-prev",
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
          {data?.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                to={`/categories/${category.id}`}
                className="bg-card-light dark:bg-card-dark border rounded-sm p-5 flex flex-col gap-5 items-center hover:scale-110 transition-all duration-300  border-black/20 dark:border-white/20 min-w-min-card"
              >
                <img
                  className="w-30 h-30 object-contain"
                  src={category.images[0]?.url || logo}
                  alt={category.nameEn}
                />
                <p>
                  {i18n.language === "ar" ? category.nameAr : category.nameEn}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
