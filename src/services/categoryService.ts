import { Axios } from "../api/Axios";
import type CategoryDto from "../dtos/CategoryDto";
import config from "../config";

export async function getAllCategories(pageNumber: number, pageSize: number) {
  const response = await Axios.get<CategoryDto[]>(
    `${config.category.getAll}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return response.data;
}
