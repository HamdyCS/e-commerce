import type { ProductDto } from "./ProductDto";

export interface SellerProductDto {
  id: number;
  price: number;
  numberInStock: number;
  productId: number;
  product: ProductDto;
}
