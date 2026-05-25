import { Helmet } from "@dr.pogodin/react-helmet";
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faCircleExclamation,
  faFileInvoice,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import CustomSkeletonTheme from "../../../components/ui/CustomSkeletonTheme";
import SummaryCartItem from "../../../components/website/cart/SummaryCartItem";
import { formatDate } from "../../../helper/helper";
import { useGetLatestUserApplicationOrderSummary } from "../../../hooks/applicationOrderSummary";

export default function SuccessPayment() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const {
    data: orderSummary,
    isPending,
    error,
  } = useGetLatestUserApplicationOrderSummary();

  // Format Delivery Range beautifully
  const formatDeliveryRange = (
    from: string | Date | null | undefined,
    to: string | Date | null | undefined,
  ) => {
    if (!from || !to) return null;
    try {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      const fromFormatted = fromDate.toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        options,
      );
      const toFormatted = toDate.toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        options,
      );
      return i18n.language === "ar"
        ? `بين ${fromFormatted} و ${toFormatted}`
        : `Between ${fromFormatted} and ${toFormatted}`;
    } catch (e) {
      return null;
    }
  };

  // Render elegant Status Badge using dynamic global translations
  const renderStatusBadge = (status: string | null | undefined) => {
    if (!status) return null;
    const s = status.toLowerCase();
    let bgColor =
      "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300";
    let text = status;

    if (s.includes("pending") || s.includes("معلق")) {
      bgColor =
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300";
      text = t("Pending");
    } else if (
      s.includes("process") ||
      s.includes("قيد") ||
      s.includes("تجهيز")
    ) {
      bgColor =
        "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300";
      text = t("Processing");
    } else if (s.includes("ship") || s.includes("شحن") || s.includes("ارسال")) {
      bgColor =
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300";
      text = t("Shipped");
    } else if (
      s.includes("deliver") ||
      s.includes("توصيل") ||
      s.includes("مكتمل")
    ) {
      bgColor =
        "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300";
      text = t("Delivered");
    } else if (s.includes("cancel") || s.includes("ملغي")) {
      bgColor = "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300";
      text = t("Cancelled");
    }

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor} print:border print:border-gray-300 print:bg-white print:text-black`}
      >
        {text}
      </span>
    );
  };

  // Render Skeleton Page
  if (isPending) {
    return (
      <CustomSkeletonTheme>
        <div className="max-w-6xl mx-auto p-4 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column Skeletons */}
            <div className="lg:col-span-3 space-y-6">
              {/* Hero Skeleton */}
              <div className="bg-white dark:bg-[#2c466e]/30 rounded-2xl p-8 text-center border border-slate-100 dark:border-white/5">
                <Skeleton
                  circle
                  width={80}
                  height={80}
                  className="mx-auto mb-6"
                />
                <Skeleton width={200} height={28} className="mx-auto mb-3" />
                <Skeleton width={320} height={20} className="mx-auto" />
              </div>

              {/* Cards Skeletons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((card) => (
                  <div
                    key={card}
                    className="bg-white dark:bg-[#2c466e]/30 rounded-2xl p-6 border border-slate-100 dark:border-white/5"
                  >
                    <Skeleton width={120} height={24} className="mb-4" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((row) => (
                        <div key={row} className="flex justify-between">
                          <Skeleton width={80} height={16} />
                          <Skeleton width={100} height={16} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Products Skeleton */}
              <div className="bg-white dark:bg-[#2c466e]/30 rounded-2xl p-6 border border-slate-100 dark:border-white/5">
                <Skeleton width={100} height={24} className="mb-6" />
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-4 items-center">
                      <Skeleton width={64} height={64} className="rounded-lg" />
                      <div className="grow">
                        <Skeleton width="60%" height={20} className="mb-2" />
                        <Skeleton width="30%" height={16} />
                      </div>
                      <Skeleton width={60} height={20} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Skeletons */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#2c466e]/30 rounded-2xl p-6 border border-slate-100 dark:border-white/5">
                <Skeleton width={120} height={24} className="mb-6" />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton width={80} height={16} />
                    <Skeleton width={60} height={16} />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton width={80} height={16} />
                    <Skeleton width={60} height={16} />
                  </div>
                  <hr className="border-slate-100 dark:border-white/5" />
                  <div className="flex justify-between">
                    <Skeleton width={80} height={24} />
                    <Skeleton width={80} height={24} />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton width="100%" height={45} className="rounded-lg" />
                <Skeleton width="100%" height={45} className="rounded-lg" />
                <Skeleton width="100%" height={45} className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </CustomSkeletonTheme>
    );
  }

  // Render Error/Empty Fallback
  if (error || !orderSummary) {
    return (
      <>
        <Helmet>
          <title>{t("Oops! Something went wrong")}</title>
        </Helmet>
        <div className="max-w-md mx-auto my-12 p-8 text-center bg-white dark:bg-[#2c466e]/30 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/50 dark:shadow-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-red-100 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FontAwesomeIcon icon={faCircleExclamation} size="2xl" />
          </motion.div>
          <h2 className="text-xl font-bold mb-3">
            {t("Oops! Something went wrong")}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            {t(
              "We couldn't retrieve your order summary. Please check your orders page in your account.",
            )}
          </p>
          <Button
            text={t("Back to Home")}
            onClick={() => navigate("/")}
            className="w-full bg-blue-500 text-white font-medium hover:bg-blue-600 rounded-xl"
          />
        </div>
      </>
    );
  }

  const {
    applicationId,
    lastApplicationOrderCreatedAt,
    paymentType,
    applicationOrderType,
    userAddressName,
    estimatedDeliveryFrom,
    estimatedDeliveryTo,
    totalPrice,
    shoppingCartDto,
  } = orderSummary;

  const isCashOnDelivery =
    paymentType?.toLowerCase() === "cashondelivery" ||
    paymentType?.toLowerCase() === "cash" ||
    paymentType === "CashOnDelivery";

  const successMessage = isCashOnDelivery
    ? t("Your order is confirmed & payment will be Cash on Delivery")
    : t("Payment successful & your order is confirmed!");

  const products = shoppingCartDto?.sellerProducts || [];

  // Calculate items total and shipping mathematically
  const productsSubtotal = products.reduce(
    (acc, item) => acc + item.totalPrice,
    0,
  );
  const calculatedShipping = Math.max(0, totalPrice - productsSubtotal);

  return (
    <>
      <Helmet>
        <title>{t("Order Confirmed!")}</title>
      </Helmet>

      <div className="relative max-w-6xl mx-auto px-4 py-8 select-none printable-invoice-area">
        {/* Soft glowing decorations - Hidden on print */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10 glow-bg" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10 glow-bg" />

        {/* Smooth entrance transition */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Main Content Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* 1. Success Hero Section */}
            <div className="bg-white dark:bg-[#2c466e]/30 rounded-3xl p-8 text-center border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none print-clean-card">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-7xl mb-5 text-green-300"
                />
              </motion.div>
              <div className="hidden print:block text-center mb-6">
                <h1 className="text-2xl font-bold text-emerald-600">
                  E-COMMERCE INVOICE
                </h1>
                <p className="text-sm text-slate-500">
                  Invoice generated on {new Date().toLocaleDateString()}
                </p>
                <hr className="my-4 border-slate-300" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white print-text-dark mb-3">
                {successMessage}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 print-text-dark text-sm max-w-lg mx-auto leading-relaxed">
                {t(
                  "Thank you for shopping with us. We have received your order and are processing it.",
                )}
              </p>
            </div>

            {/* Information Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 2. Order Information Card */}
              <div className="bg-white dark:bg-[#2c466e]/30 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none print-clean-card">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-white/5 print:border-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center print:bg-slate-100 print:text-black">
                    <FontAwesomeIcon icon={faFileInvoice} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white print-text-dark">
                    {t("Order Details")}
                  </h3>
                </div>
                <ul className="space-y-3.5 text-sm">
                  <li className="flex justify-between items-center print-flex-row">
                    <span className="text-slate-500 dark:text-slate-400 print-text-dark font-medium">
                      {t("Order Number")}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 print-text-dark">
                      #{applicationId}
                    </span>
                  </li>
                  <li className="flex justify-between items-center print-flex-row">
                    <span className="text-slate-500 dark:text-slate-400 print-text-dark font-medium">
                      {t("Order Date")}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 print-text-dark">
                      {formatDate(lastApplicationOrderCreatedAt, i18n.language)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center print-flex-row">
                    <span className="text-slate-500 dark:text-slate-400 print-text-dark font-medium">
                      {t("Payment Method")}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 print-text-dark font-semibold">
                      {isCashOnDelivery ? t("Cash on Delivery") : t("Pre-paid")}
                    </span>
                  </li>
                  <li className="flex justify-between items-center print-flex-row">
                    <span className="text-slate-500 dark:text-slate-400 print-text-dark font-medium">
                      {t("Order Status")}
                    </span>
                    <span>{renderStatusBadge(applicationOrderType)}</span>
                  </li>
                </ul>
              </div>

              {/* 3. Delivery Information Card */}
              <div className="bg-white dark:bg-[#2c466e]/30 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none print-clean-card">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-white/5 print:border-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center print:bg-slate-100 print:text-black">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white print-text-dark">
                    {t("Delivery Information")}
                  </h3>
                </div>
                <ul className="space-y-3.5 text-sm">
                  <li className="flex justify-between items-start print-flex-row">
                    <span className="text-slate-500 dark:text-slate-400 print-text-dark font-medium shrink-0">
                      {t("Shipping Address")}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 print-text-dark text-right font-semibold max-w-[70%]">
                      {userAddressName}
                    </span>
                  </li>
                  <li className="flex justify-between items-start print-flex-row gap-5">
                    <span className="text-slate-500 dark:text-slate-400 print-text-dark font-medium shrink-0">
                      {t("Estimated Delivery Date")}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 print-text-dark font-bold text-right flex items-center gap-1.5 justify-end">
                      {formatDeliveryRange(
                        estimatedDeliveryFrom,
                        estimatedDeliveryTo,
                      ) || t("Delivery date will be scheduled soon")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4. Products Section */}
            <SummaryCartItem order={orderSummary} />
          </div>

          {/* Sidebar Column: Sticky Summary & Action Buttons */}
          <div className=" lg:col-span-2 space-y-6">
            {/* 5. Order Summary Card */}
            <div className="bg-white dark:bg-[#2c466e]/30 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none print-clean-card">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100 dark:border-white/5 print:border-slate-300">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center print:bg-slate-100 print:text-black">
                  <FontAwesomeIcon icon={faFileInvoice} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white print-text-dark">
                  {t("Order Summary")}
                </h3>
              </div>

              <ul className="space-y-4 text-sm mb-6">
                <li className="flex justify-between items-center print-flex-row">
                  <span className="text-slate-500 dark:text-slate-400 print-text-dark">
                    {t("Subtotal")}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 print-text-dark">
                    ${productsSubtotal.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between items-center print-flex-row">
                  <span className="text-slate-500 dark:text-slate-400 print-text-dark">
                    {t("Shipping Cost")}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 print-text-dark">
                    {calculatedShipping > 0
                      ? `$${calculatedShipping.toFixed(2)}`
                      : t("Free")}
                  </span>
                </li>
                <hr className="border-slate-100 dark:border-white/5 print:border-slate-300" />
                <li className="flex justify-between items-center print-flex-row">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white print-text-dark">
                    {t("Total Price")}
                  </span>
                  <span className="font-extrabold text-xl text-emerald-600 dark:text-emerald-400 print-text-dark">
                    ${totalPrice.toFixed(2)}
                  </span>
                </li>
              </ul>

              {/* 6. Action Buttons Section - Hidden on Print */}
              <div className="space-y-3.5 no-print">
                {/* Track Order Button */}
                <Button
                  text={t("Track Order")}
                  onClick={() => navigate("/my-account/profile")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold h-12 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] select-none flex items-center justify-center gap-2 cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-3">
                  {/* Continue Shopping Button */}
                  <button
                    onClick={() => navigate("/")}
                    className="h-11 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none"
                  >
                    <FontAwesomeIcon
                      icon={i18n.language === "ar" ? faArrowLeft : faArrowRight}
                    />
                    {t("Continue Shopping")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
