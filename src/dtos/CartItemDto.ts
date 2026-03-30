export default interface CartItemDto {
  id?: number;
  quantity: number;
  sellerProductId: number;
  productId: number;
  shoppingCartId?: number;
  totalPrice: number;
  productNameEn: string;
  productNameAr: string;
  productImageUrl: string;
}
