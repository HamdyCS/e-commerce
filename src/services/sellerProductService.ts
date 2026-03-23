import { Axios } from "../api/Axios";
import config from "../config";
import type { PaginationDto } from "../dtos/PaginationDto";
import type { SellerProductDto } from "../dtos/SellerProductDto";
import type PaginationType from "../types/PaginationType";

export async function getSellerProducts({
  pageNumber,
  pageSize,
}: PaginationType) {
  const response = await Axios.get<PaginationDto<SellerProductDto>>(
    `${config.sellerProduct.getAll}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
}
