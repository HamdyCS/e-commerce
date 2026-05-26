import type CartDto from "../CartDto";

export default interface ApplicationOrderSummaryDto {
  applicationId: number;
  lastApplicationOrderTypeId: number;
  lastApplicationOrderCreatedAt: string;
  shoppingCartId: number;
  userAddressId: number;
  userAddressName: string;
  totalPrice: number;
  returnApplicatonId: number | null;
  returnApplicationCreatedAt: string | null;
  shoppingCartDto: CartDto;
  paymentType: string;
  lastApplicationOrderType: string;
  estimatedDeliveryFrom: Date | null;
  estimatedDeliveryTo: Date | null;
}
