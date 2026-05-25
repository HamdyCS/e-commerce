import { Axios } from "../api/Axios";
import config from "../config";
import type PaymentCashOnDeliveryDto from "../dtos/payment/PaymentCashOnDeliveryDto";
import type { CashOnDeliveryResultDto } from "../dtos/payment/CashOnDeliveryResultDto";
import type { PaymentPrePaidDto } from "../dtos/payment/PaymentPrePaidDto";
import type { PrePaidResultDto } from "../dtos/payment/PrePaidResultDto";
import type { PaymentDto } from "../dtos/payment/PaymentDto";

export async function cashOnDeliveryPayment(
  paymentCashOnDeliveryDto: PaymentCashOnDeliveryDto,
): Promise<CashOnDeliveryResultDto> {
  const res = await Axios.post<CashOnDeliveryResultDto>(
    config.payment.cashOnDelivery,
    paymentCashOnDeliveryDto,
  );
  return res.data;
}

export async function prePaidPayment(
  paymentPrePaidDto: PaymentPrePaidDto,
): Promise<PrePaidResultDto> {
  const res = await Axios.post<PrePaidResultDto>(
    config.payment.prePaid,
    paymentPrePaidDto,
  );
  return res.data;
}

export async function getPaymentBySessionId(
  sessionId: string,
): Promise<PaymentDto> {
  const res = await Axios.get<PaymentDto>(
    `${config.payment.getPaymentBySessionId}/${sessionId}`,
  );
  return res.data;
}
