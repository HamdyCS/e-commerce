import { Axios } from "../api/Axios";
import config from "../config";
import type PaymentCashOnDeliveryDto from "../dtos/payment/PaymentCashOnDeliveryDto";
import type { CashOnDeliveryResultDto } from "../dtos/payment/CashOnDeliveryResultDto";

export async function cashOnDeliveryPayment(
  paymentCashOnDeliveryDto: PaymentCashOnDeliveryDto,
): Promise<CashOnDeliveryResultDto> {
  const res = await Axios.post<CashOnDeliveryResultDto>(
    config.payment.cashOnDelivery,
    paymentCashOnDeliveryDto,
  );
  return res.data;
}
