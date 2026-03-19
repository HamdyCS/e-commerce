import { Axios } from "../api/Axios";
import type CategoryDto from "../dtos/CategoryDto";
import config from "../config";
import type PaginationType from "../types/PaginationType";

export async function getAllCategories({
  pageNumber,
  pageSize,
}: PaginationType) {
  const response = await Axios.get<CategoryDto[]>(
    `${config.category.getAll}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
}
