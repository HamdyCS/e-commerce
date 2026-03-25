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

export async function getSellerProductById(id: string) {
  const response = await Axios.get<SellerProductDto>(
    `${config.sellerProduct.getById}/${id}`,
  );
  return response.data;
}

export async function getSellerProductsBySubCategoryId({
  subCategoryId,
  pagination: { pageNumber, pageSize },
}: {
  subCategoryId: number;
  pagination: PaginationType;
}) {
  const response = await Axios.get<PaginationDto<SellerProductDto>>(
    `${config.sellerProduct.getBySubCategoryId}/${subCategoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
}

export async function getSellerProductsByCategoryId({
  categoryId,
  pagination: { pageNumber, pageSize },
}: {
  categoryId: number;
  pagination: PaginationType;
}) {
  const response = await Axios.get<PaginationDto<SellerProductDto>>(
    `${config.sellerProduct.getByCategoryId}/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
}

export async function getSellerProductsByBrandId({
  brandId,
  pagination: { pageNumber, pageSize },
}: {
  brandId: number;
  pagination: PaginationType;
}) {
  const response = await Axios.get<PaginationDto<SellerProductDto>>(
    `${config.sellerProduct.getByBrandId}/${brandId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
}
