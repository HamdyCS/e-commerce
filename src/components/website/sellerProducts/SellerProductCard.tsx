import type { SellerProductDto } from "../../../dtos/SellerProductDto";
import logo from "../../../assets/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface SellerProductCardProps {
  sellerProduct: SellerProductDto;
}

export default function SellerProductCard({
  sellerProduct,
}: SellerProductCardProps) {
  const { i18n } = useTranslation();
  const firstImage = sellerProduct.product.images?.[0]?.url;
  return (
    <div className="p-5 min-w-min-card product-card text-wrap bg-card-light dark:bg-card-dark border border-black/20 dark:border-white/20 relative rounded-sm group overflow-hidden">
      <Link to={`/seller-product/${sellerProduct.id}`} className="space-y-5">
        <div className="flex justify-center items-center ">
          <img className="w-30 h-30 object-contain" src={firstImage || logo} />
        </div>
        <div className="space-y-2 mb-6">
          <p className="font-bold">
            {i18n.language === "ar"
              ? sellerProduct.product.nameAr
              : sellerProduct.product.nameEn}
          </p>
          <p className="text-[#DB4444]">${sellerProduct.price}</p>
        </div>
      </Link>
      <div className="absolute add-to-cart bottom-0 right-0 w-full bg-black dark:bg-secondary-dark-bg text-white text-center py-2 rounded-sm opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out cursor-pointer">
        Add To cart
      </div>
    </div>
  );
}
