import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import Order from "../../../components/website/orders/Order";
import { useGetAllUserApplicationOrderSummaries } from "../../../hooks/applicationOrderSummary";
import "react-loading-skeleton/dist/skeleton.css";
import CustomSkeletonTheme from "../../../components/ui/CustomSkeletonTheme";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Orders() {
  const { data: orders, isFetching } = useGetAllUserApplicationOrderSummaries();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("Orders")}</title>
      </Helmet>
      <div className="space-y-7 w-full  min-h-screen">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          {t("Orders")}
        </h2>
        {isFetching ? (
          <CustomSkeletonTheme>
            {[1, 2, 3].map((index) => (
              <div key={index} className="order text-[13px] relative">
                <div className="header grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 justify-between items-center gap-6 dark:bg-gray-600/70 bg-gray-300/70 p-5 rounded-lg">
                  <div className="space-y-2">
                    <Skeleton width={150} height={20} />
                    <Skeleton width={100} height={16} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={80} height={16} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={120} height={16} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton width={120} height={20} />
                    <Skeleton width={100} height={16} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={80} height={16} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={100} height={16} />
                  </div>
                </div>
              </div>
            ))}
          </CustomSkeletonTheme>
        ) : (
          <>
            {orders?.length === 0 && (
              <p className="text-center text-gray-500">
                {t("No orders found")}
              </p>
            )}
            {orders?.map((order) => (
              <Order key={order.applicationId} order={order} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
