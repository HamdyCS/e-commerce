export interface ApplicationOrderDto {
  id: number;
  applicationId: number;
  applicationOrderTypeId: number;
  shoppingCartId: number;
  paymentId: number;
  deliveryId: string | null;
}
