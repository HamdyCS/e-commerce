import type ImageDto from "./ImageDto";

export default interface CategoryDto {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  images: ImageDto[];
}
