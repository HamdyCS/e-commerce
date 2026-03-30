import { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Button from "../../../components/ui/Button";
import Counter from "../../../components/ui/Counter";
import CustomSkeletonTheme from "../../../components/ui/CustomSkeletonTheme";
import SellerProductRate from "../../../components/website/sellerProducts/SellerProductRate";
import RelatedProductSwiper from "../../../components/website/swiper/RelatedProductSwiper";
import { useGetSellerProductById } from "../../../hooks/sellerProduct";
import type CartItemDto from "../../../dtos/CartItemDto";
import { useAddItemToCart } from "../../../hooks/cart";
import { useAppSelector } from "../../../redux/hook/reduxHooks";

// const fakeImages = [
//   "https://www.citypng.com/public/uploads/preview/white-ps5-controller-design-gaming-side-view-701751695142713jvjd9h0kfr.png",
//   "https://www.citypng.com/public/uploads/preview/sony-playstation5-ps5-white-controller-design-701751695142717blpzualcqv.png",
//   "https://www.citypng.com/public/uploads/preview/playstation5-ps5-black-controller-design-image-701751695142476s2vffpigww.png",
//   "https://www.citypng.com/public/uploads/preview/playstation5-dualsense-charging-station-controller-735811696860072clqytyafjb.png",
// ];

export default function SellerProduct() {
  const { id } = useParams();
  const { data, isLoading } = useGetSellerProductById(id || "");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { mutate, isPending: isPendingAddToCart } = useAddItemToCart();
  const { cart } = useAppSelector((state) => state.cart);

  const { t, i18n } = useTranslation();

  if (isLoading) {
    return (
      <CustomSkeletonTheme>
        <div className="flex flex-col lg:flex-row gap-20">
          {/* القسم الأيسر: الصور */}
          <div className="flex gap-5">
            <div className="flex lg:flex-col flex-wrap gap-5">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div key={index} className="w-40 h-40">
                  <Skeleton width="100%" height="100%" />
                </div>
              ))}
            </div>
            <div className="w-120 h-120 hidden lg:block">
              <Skeleton width="100%" height="100%" />
            </div>
          </div>

          {/* القسم الأيمن: التفاصيل */}
          <div className="space-y-5 grow">
            {/* العنوان */}
            <h2 className="text-medium">
              <Skeleton width="80%" height={30} />
            </h2>

            {/* التقييم والحالة */}
            <div className="flex items-center gap-5">
              <Skeleton width={100} height={20} />
              <Skeleton
                style={{ width: "1px" }}
                className="h-8 bg-gray-200 dark:bg-gray-500"
              />
              <Skeleton width={80} height={20} />
            </div>

            {/* السعر */}
            <p className="text-medium">
              <Skeleton width={60} height={25} />
            </p>

            {/* الوصف */}
            <div className="text-small">
              <Skeleton count={3} />
            </div>

            {/* الفاصل */}
            <div className="w-full max-w-xl">
              <Skeleton height={2} />
            </div>

            {/* اللون والمقاسات */}
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <Skeleton width={50} height={20} />
                <Skeleton circle width={25} height={25} />
              </div>
              <div className="flex gap-5 flex-wrap">
                <Skeleton width={70} height={20} />
                <Skeleton width={70} height={20} />
                <Skeleton width={70} height={20} />
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center flex-wrap gap-5">
              {/* الكاونتر */}
              <div className="w-32 h-11">
                <Skeleton width="100%" height="100%" />
              </div>
              {/* زر الإضافة للسلة */}
              <div className="w-44 h-11">
                <Skeleton width="100%" height="100%" />
              </div>
            </div>
          </div>
        </div>
      </CustomSkeletonTheme>
    );
  }

  function handleAddCart(): void {
    const cartItem: CartItemDto = {
      productId: data?.product.id || 0,
      quantity: quantity,
      totalPrice: (data?.price || 0) * quantity,
      productImageUrl: data?.product.images?.[0].url || "",
      productNameAr: data?.product.nameAr || "",
      productNameEn: data?.product.nameEn || "",
      sellerProductId: data?.id || 0,
      shoppingCartId: cart?.id || 0,
    };
    mutate(cartItem);
  }

  return (
    <div className="space-y-20">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex gap-5">
          <div className="flex lg:flex-col flex-wrap gap-5">
            {data?.product.images?.map((image, index) => (
              <div
                key={index}
                className="w-40 h-40 p-5 bg-card-light dark:bg-card-dark cursor-pointer"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="w-120 h-120 p-5 bg-card-light dark:bg-card-dark hidden lg:block">
            <img
              src={selectedImage || logo}
              alt="product selected image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-5 grow">
          <h2 className="font-bold text-medium">
            {i18n.language === "ar"
              ? data?.product.nameAr
              : data?.product.nameEn}
          </h2>
          <div className="flex items-center gap-5">
            <SellerProductRate
              rate={data?.product.avgRating || 0}
              reviewCount={data?.product.ratingCount || 0}
            />
            <div style={{ width: "1px" }} className=" h-8 bg-gray-500"></div>
            <p
              style={{
                color: "gold",
              }}
            >
              {(data?.numberInStock || 0) > 0
                ? t("In Stock")
                : t("Out of Stock")}
            </p>
          </div>
          <p className="text-medium  ">${data?.price}</p>
          <p className="text-small">
            {i18n.language === "ar"
              ? data?.product.descriptionAr
              : data?.product.descriptionEn}
          </p>
          <div className="w-full max-w-xl h-1 bg-gray-500"></div>
          <div className="flex items-center gap-5">
            <p className="text-medium">{t("Color")}:</p>
            <div className="text-medium capitalize flex items-center gap-2">
              <p>{data?.product.color}</p>
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  backgroundColor: data?.product.color,
                }}
              ></div>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <p>
              {t("Size")}: {data?.product.size}
            </p>
            <p>
              {t("Height")}: {data?.product.height}
            </p>
            <p>
              {t("Length")}: {data?.product.length}
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-5">
            <Counter
              min={1}
              max={data?.numberInStock || 0}
              value={quantity}
              onChange={(value) => setQuantity(value)}
            />
            <Button
              text={t("Add to Cart")}
              onClick={handleAddCart}
              className="py-2 px-10 bg-red-500 text-white h-11"
              disabled={data?.numberInStock === 0 || isPendingAddToCart}
              isLoading={isPendingAddToCart}
            />
          </div>
        </div>
      </div>
      <RelatedProductSwiper
        productSubCategoryId={
          data?.product.productSubCategoryId.toString() || ""
        }
      />
    </div>
  );
}
