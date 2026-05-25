import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SummaryCartItem from "../../../components/website/cart/SummaryCartItem";
import CustomSkeletonTheme from "../../../components/ui/CustomSkeletonTheme";
import { formatDate } from "../../../helper/helper";
import { useGetUserApplicationOrderSummaryById } from "../../../hooks/applicationOrderSummary";
import { getApplicationOrderType } from "../../../types/ApplicationOrderTypes";
import { Helmet } from "@dr.pogodin/react-helmet";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderDetailes() {
  const { orderId } = useParams();
  const { t, i18n } = useTranslation();
  const {
    data: order,
    isPending,
    isError,
  } = useGetUserApplicationOrderSummaryById(orderId || "");

  if (isError) {
    return <p className="text-center text-gray-500">{t("Order not found")}</p>;
  }

  return (
    <>
      <Helmet>
        <title>{`${t("Orders")} ${orderId ? orderId : ""}`}</title>
      </Helmet>
      <div className="order text-[13px] w-full">
        {isPending ? (
          <CustomSkeletonTheme>
            <div className="space-y-7">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white px-1">
                <Skeleton width={200} />
              </h2>

              <div className="w-full grid grid-cols-1 lg:grid-cols-3 justify-between items-center gap-6 bg-white dark:bg-[#2c466e]/30 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={120} height={16} />
                  </div>
                ))}
              </div>

              <div className="flex lg:flex-row flex-col items-center justify-center gap-6">
                <div className="flex items-center lg:flex-row flex-col gap-6">
                  <div className="w-30 h-30 rounded-full border-3 flex items-center justify-center">
                    <Skeleton />
                  </div>
                  <div className="w-1 h-30 lg:w-30 lg:h-1 bg-black dark:bg-white rounded-md">
                    <Skeleton />
                  </div>
                </div>
                <div className="flex items-center flex-col lg:flex-row gap-6">
                  <div className="w-30 h-30 rounded-full border-3 flex items-center justify-center">
                    <Skeleton />
                  </div>
                  <div className="w-1 h-30 lg:w-30 lg:h-1 bg-black dark:bg-white rounded-md">
                    <Skeleton />
                  </div>
                </div>
                <div className="flex justify-center lg:justify-normal">
                  <div className="w-30 h-30 rounded-full border-3 flex items-center justify-center">
                    <Skeleton />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#2c466e]/30 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Skeleton circle={true} width={40} height={40} />
                        <div>
                          <Skeleton width={120} height={16} />
                          <Skeleton
                            width={80}
                            height={14}
                            style={{ marginTop: 8 }}
                          />
                        </div>
                      </div>
                      <Skeleton width={80} height={24} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Skeleton width={60} height={20} />
                        <Skeleton width={60} height={20} />
                      </div>
                      <Skeleton width={80} height={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CustomSkeletonTheme>
        ) : (
          order && (
            <div className="space-y-7">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white px-1">
                {t("Order")} {orderId}
              </h2>
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 justify-between items-center gap-6 bg-white dark:bg-[#2c466e]/30 rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none">
                <div className="space-y-2">
                  <h4 className="text-bold text-black/70 dark:text-white/70">
                    {t("The application was submitted")}
                  </h4>
                  <p>
                    {formatDate(
                      order.lastApplicationOrderCreatedAt,
                      i18n.language,
                    )}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-bold text-black/70 dark:text-white/70">
                    {t("Total")}
                  </h4>
                  <p>{order.totalPrice.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-bold text-black/70 dark:text-white/70">
                    {t("Address")}
                  </h4>
                  <p>{order.userAddressName}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-bold text-black/70 dark:text-white/70">
                    {t("Application Number")}
                  </h4>
                  <p>{order.applicationId}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-bold text-black/70 dark:text-white/70">
                    {t("Payment Method")}
                  </h4>
                  <p>{t(order.paymentType)}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-bold text-black/70 dark:text-white/70">
                    {t("Order Status")}
                  </h4>
                  <p>
                    {order.returnApplicatonId != null
                      ? t("Returned")
                      : t(
                          getApplicationOrderType(
                            order.lastApplicationOrderTypeId,
                          ),
                        )}
                  </p>
                </div>
              </div>

              <div className="flex lg:flex-row flex-col items-center justify-center gap-6">
                <div className="flex items-center lg:flex-row flex-col gap-6">
                  <div
                    className="w-30 h-30 rounded-full border-3 flex items-center justify-center"
                    style={{
                      borderColor:
                        order.applicationOrderTypeId >= 1 ? "orange" : "",
                    }}
                  >
                    {t("Under Processing")}
                  </div>
                  <div
                    className="w-1 h-30 lg:w-30 lg:h-1 bg-black dark:bg-white rounded-md"
                    style={{
                      backgroundColor:
                        order.applicationOrderTypeId >= 1 ? "orange" : "",
                    }}
                  ></div>
                </div>
                <div className="flex items-center flex-col lg:flex-row gap-6">
                  <div
                    className="w-30 h-30 rounded-full border-3 flex items-center justify-center"
                    style={{
                      borderColor:
                        order.applicationOrderTypeId >= 2 ? "orange" : "",
                    }}
                  >
                    {t("Shipped")}
                  </div>
                  <div
                    className="w-1 h-30 lg:w-30 lg:h-1 bg-black dark:bg-white rounded-md"
                    style={{
                      backgroundColor:
                        order.applicationOrderTypeId >= 2 ? "orange" : "",
                    }}
                  ></div>
                </div>
                <div className="flex justify-center lg:justify-normal">
                  <div
                    className="w-30 h-30 rounded-full border-3 flex items-center justify-center"
                    style={{
                      borderColor:
                        order.applicationOrderTypeId >= 3 ? "orange" : "",
                    }}
                  >
                    {t("Delivered")}
                  </div>
                </div>
              </div>

              <SummaryCartItem order={order} />
            </div>
          )
        )}
      </div>
    </>
  );
}
