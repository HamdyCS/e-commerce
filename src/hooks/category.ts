import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/categoryService";
import type PaginationOptions from "./types/PaginationOptions";
import type CategoryDto from "../dtos/CategoryDto";

export function useGetAllCategories({
  pageNumber,
  pageSize,
}: PaginationOptions) {
  return useQuery<CategoryDto[]>({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(pageNumber, pageSize),
  });
}
