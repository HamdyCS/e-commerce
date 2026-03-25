import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  getSellerProductById,
  getSellerProducts,
  getSellerProductsBySubCategoryId,
} from "../services/sellerProductService";
import type { PaginationDto } from "../dtos/PaginationDto";
import type { SellerProductDto } from "../dtos/SellerProductDto";
import type { AxiosError } from "axios";

export function useGetAllSellerProducts(pageSize: number) {
  // TData, TError, TPageData, TQueryKey, TPageParam
  return useInfiniteQuery<
    PaginationDto<SellerProductDto>,
    AxiosError,
    InfiniteData<PaginationDto<SellerProductDto>>,
    ["seller-products", number],
    number
  >({
    queryKey: ["seller-products", pageSize],

    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }) =>
      getSellerProducts({ pageNumber: Number(pageParam), pageSize }),

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,

    getPreviousPageParam: (lastPage) =>
      lastPage.hasPreviousPage ? lastPage.previousPage : undefined,
  });
}

export function useGetSellerProductById(id: string) {
  return useQuery<SellerProductDto, AxiosError>({
    queryKey: ["seller-product", id],
    queryFn: () => getSellerProductById(id),
  });
}

export function useGetSellerProductsBySubCategoryId(
  subCategoryId: number,
  pageSize: number,
) {
  return useInfiniteQuery<
    PaginationDto<SellerProductDto>,
    AxiosError,
    InfiniteData<PaginationDto<SellerProductDto>>,
    ["seller-products-by-sub-category", number],
    number
  >({
    queryKey: ["seller-products-by-sub-category", subCategoryId],

    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }) =>
      getSellerProductsBySubCategoryId({
        subCategoryId,
        pagination: { pageNumber: Number(pageParam), pageSize },
      }),

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,

    getPreviousPageParam: (lastPage) =>
      lastPage.hasPreviousPage ? lastPage.previousPage : undefined,
  });
}
