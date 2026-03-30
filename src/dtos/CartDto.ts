import type CartItemDto from "./CartItemDto";

export default interface CartDto {
  id: number;
  createdAt: string;
  userId: string;
  sellerProducts: CartItemDto[];
}
