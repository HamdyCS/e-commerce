import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type ApplicationOrderSummaryDto from "../../../dtos/ApplicationOrder/ApplicationOrderSummaryDto";
import { formatDate } from "../../../helper/helper";
import { getApplicationOrderType } from "../../../types/ApplicationOrderTypes";
import SummaryCartItems from "../cart/SummaryCartItem";
import { Link } from "react-router-dom";

interface OrderProps {
  order: ApplicationOrderSummaryDto;
}

export default function Order({ order }: OrderProps) {
  const { t, i18n } = useTranslation();
  const [showOrderProducts, setShowOrderProducts] = useState(false);

  return (
    <div className="order text-[13px] relative block">
      <div className="header grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 justify-between items-center gap-6 dark:bg-gray-600/70  bg-gray-300/70 p-5 rounded-lg">
        <div className="space-y-2">
          <h4 className="text-bold text-black/70 dark:text-white/70">
            {t("The application was submitted")}
          </h4>
          <p>
            {formatDate(order.lastApplicationOrderCreatedAt, i18n.language)}
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
              : t(getApplicationOrderType(order.lastApplicationOrderTypeId))}
          </p>
        </div>

        <Link
          to={`/my-account/orders/${order.applicationId}`}
          className="text-bold text-blue-400"
        >
          {t("View order details")}
        </Link>
        <div className="absolute top-3 rtl:left-3 ltr:right-3">
          <FontAwesomeIcon
            icon={faAngleUp}
            onClick={() => setShowOrderProducts((prev) => !prev)}
            className="cursor-pointer"
            size="lg"
            style={{
              rotate: showOrderProducts ? "360deg" : "180deg",
              transition: "rotate 0.3s ease-in-out",
            }}
          />
        </div>
      </div>
      <AnimatePresence>
        {showOrderProducts && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: showOrderProducts ? "auto" : 0, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <SummaryCartItems order={order} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
