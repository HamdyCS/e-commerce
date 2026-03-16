import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/categoryService";
import type PaginationOptions from "./types/PaginationOptions";

export function useGetAllCategories({
  pageNumber,
  pageSize,
}: PaginationOptions) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(pageNumber, pageSize),
  });
}
