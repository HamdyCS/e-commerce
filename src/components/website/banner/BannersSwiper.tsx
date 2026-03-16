import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useGetAllActiveBanners } from "../../../hooks/banner";
import { Link } from "react-router-dom";
import CustomSkeletonTheme from "../../ui/CustomSkeletonTheme";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

export default function BannersSwiper() {
  const { data, isLoading } = useGetAllActiveBanners();

  const { i18n } = useTranslation();

  const skeletonElement = (
    <>
      <Skeleton className="h-70!" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
        <Skeleton
          width={"15px"}
          height={"15px"}
          className="rounded-full! border-2 border-black/10 dark:border-white/10"
        />
        <Skeleton
          width={"15px"}
          height={"15px"}
          className="rounded-full! border-2 border-black/10 dark:border-white/10"
        />
        <Skeleton
          width={"15px"}
          height={"15px"}
          className="rounded-full! border-2 border-black/10 dark:border-white/10"
        />
      </div>
    </>
  );

  return (
    <div className="w-full">
      {isLoading && (
        <CustomSkeletonTheme>{skeletonElement}</CustomSkeletonTheme>
      )}
      {!isLoading && (
        <Swiper
          key={i18n.language} // to re-render when language changes
          modules={[Pagination, Autoplay]}
          spaceBetween={20} // المسافة بين السلايدات
          slidesPerView={1} // عدد السلايدات اللي تظهر
          pagination={{ clickable: true }} // تفعيل النقاط
          autoplay={{ delay: 3000 }} // تشغيل تلقائي كل 3 ثواني
          speed={1000} // سرعة التحريك
          loop={true} // يخلي العرض دائري
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          {data?.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full  h-50 lg:h-100 bg-fill bg-no-repeat bg-center"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
