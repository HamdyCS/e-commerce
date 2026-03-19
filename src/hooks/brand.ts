import { useQuery } from "@tanstack/react-query";
import type PaginationType from "../types/PaginationType";
import { getAllBrands } from "../services/brandService";

export function useGetAllBrands(pagination: PaginationType) {
  return useQuery({
    queryKey: ["brands", pagination.pageNumber, pagination.pageSize],
    queryFn: () => getAllBrands(pagination),
  });
}
