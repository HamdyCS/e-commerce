import type PaginationType from "../types/PaginationType";
import { Axios } from "../api/Axios";
import type BrandDto from "../dtos/BrandDto";
import config from "../config";

export async function getAllBrands({ pageNumber, pageSize }: PaginationType) {
  const response = await Axios.get<BrandDto[]>(
    `${config.brand.getAll}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
}
