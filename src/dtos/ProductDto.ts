import type ImageDto from "./ImageDto";

export interface ProductDto {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  size: string;
  color: string;
  height: number;
  length: number;
  productSubCategoryId: number;
  brandId: number;
  images: ImageDto[];
}
