import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/logo.png";
import type ApplicationOrderSummaryDto from "../../../dtos/ApplicationOrder/ApplicationOrderSummaryDto";
import { useTranslation } from "react-i18next";

interface SummeryCartItemsProps {
  order: ApplicationOrderSummaryDto;
}
export default function SummaryCartItem({ order }: SummeryCartItemsProps) {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-white dark:bg-[#2c466e]/30 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none ">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100 dark:border-white/5 print:border-slate-300">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center print:bg-slate-100 print:text-black">
          <FontAwesomeIcon icon={faShoppingBag} />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white print-text-dark">
          {t("Products")}
        </h3>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-white/5 print:divide-slate-300">
        {order.shoppingCartDto.sellerProducts.map((item, idx) => {
          const unitPrice = item.totalPrice / item.quantity;
          const productName =
            i18n.language === "ar" ? item.productNameAr : item.productNameEn;
          return (
            <div
              key={item.sellerProductId || idx}
              className="py-4 flex gap-4 items-center justify-between first:pt-0 last:pb-0 print-flex-row"
            >
              <div className="flex items-center gap-4">
                {/* Product Image - Hidden on Print */}
                <div className="w-16 h-16 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 p-1 flex items-center justify-center shrink-0 no-print overflow-hidden">
                  <img
                    src={item.productImageUrl || logo}
                    alt={productName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-850 dark:text-slate-100 print-text-dark text-sm line-clamp-2">
                    {productName}
                  </h4>
                  <p className="text-slate-400 dark:text-slate-400 print-text-dark text-xs mt-1">
                    {t("Price")}: ${unitPrice.toFixed(2)} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-slate-900 dark:text-white print-text-dark text-sm">
                  ${item.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
