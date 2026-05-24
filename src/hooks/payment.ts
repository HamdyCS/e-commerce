import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type PaymentCashOnDeliveryDto from "../dtos/payment/PaymentCashOnDeliveryDto";
import type { PaymentPrePaidDto } from "../dtos/payment/PaymentPrePaidDto";
import { clearCart } from "../redux/slices/cartSlice";
import {
  cashOnDeliveryPayment,
  prePaidPayment,
} from "../services/paymentService";

export function useCashOnDeliveryPayment() {
  const navigate = useNavigate();
  const appDispatch = useDispatch();
  return useMutation({
    mutationFn: (paymentCashOnDeliveryDto: PaymentCashOnDeliveryDto) =>
      cashOnDeliveryPayment(paymentCashOnDeliveryDto),

    onSuccess(data) {
      toast.success(t("Payment successful"));
      appDispatch(clearCart());
      navigate(`/checkout/success`);
    },

    onError(error) {
      toast.error(t("Payment failed"));
      navigate(`/checkout/failed`);
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

    onError(error) {
      toast.error(t("Payment failed"));
    },
  });
}
