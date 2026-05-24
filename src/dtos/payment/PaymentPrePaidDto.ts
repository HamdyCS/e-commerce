export interface PaymentPrePaidDto {
  id: number;
  userAddressId: number;
  shoppingCartId: number;
  successUrl: string;
  cancelUrl: string;
}
