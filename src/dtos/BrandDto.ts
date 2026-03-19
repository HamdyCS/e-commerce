import type ImageDto from "./ImageDto";

export default interface BrandDto {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: any;
  descriptionAr: string;
  image: ImageDto;
}
