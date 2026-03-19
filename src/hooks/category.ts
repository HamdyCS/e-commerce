import { useQuery } from "@tanstack/react-query";
import type CategoryDto from "../dtos/CategoryDto";
import { getAllCategories } from "../services/categoryService";
import type PaginationType from "../types/PaginationType";

export function useGetAllCategories({ pageNumber, pageSize }: PaginationType) {
  return useQuery<CategoryDto[]>({
    //مع اي تغيير في القيم سيتم اعادة احضار البيانات
    queryKey: ["categories", pageNumber, pageSize],
    queryFn: () => getAllCategories({ pageNumber, pageSize }),
  });
}
