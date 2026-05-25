import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type PaymentCashOnDeliveryDto from "../dtos/payment/PaymentCashOnDeliveryDto";
import type { PaymentPrePaidDto } from "../dtos/payment/PaymentPrePaidDto";
import { clearCart } from "../redux/slices/cartSlice";
import {
  cashOnDeliveryPayment,
  getPaymentBySessionId,
  prePaidPayment,
} from "../services/paymentService";
import { getPaymentStatus } from "../types/PaymentStatusType";

export function useCashOnDeliveryPayment() {
  const appDispatch = useDispatch();
  return useMutation({
    mutationFn: (paymentCashOnDeliveryDto: PaymentCashOnDeliveryDto) =>
      cashOnDeliveryPayment(paymentCashOnDeliveryDto),

    onSuccess() {
      toast.success(t("Payment successful"));
      appDispatch(clearCart());
      window.location.href = `${window.location.origin}/checkout/success`;
    },

    onError() {
      toast.error(t("Payment failed"));
      window.location.href = `${window.location.origin}/checkout/failed`;
    },
  });
}

export function usePrePaidPayment() {
  return useMutation({
    mutationFn: (paymentPrePaidDto: PaymentPrePaidDto) =>
      prePaidPayment(paymentPrePaidDto),

    onSuccess(data) {
      window.location.href = data.sessionUrl;
    },

    onError() {
      toast.error(t("Payment failed"));
    },
  });
}

export function usePaymentBySessionId(sessionId: string) {
  const appDispatch = useDispatch();
  const retryCount = useRef(0);

  return useQuery({
    queryKey: ["payment", sessionId],
    queryFn: () => getPaymentBySessionId(sessionId),
    refetchInterval(query) {
      const paymentStatus = getPaymentStatus(
        query.state.data?.paymentStatusId || null,
      );

      retryCount.current++;

      if (retryCount.current > 10) {
        window.location.href = `${window.location.origin}/checkout/failed`;
        return false;
      }

      if (paymentStatus === "Succeeded") {
        toast.success(t("Payment successful"));
        appDispatch(clearCart());
        window.location.href = `${window.location.origin}/checkout/success`;
        return false;
      }
      if (paymentStatus === "Failed") {
        toast.error(t("Payment failed"));
        window.location.href = `${window.location.origin}/checkout/failed`;
        return false;
      }
      return 2000;
    },
  });
}
