export interface PaginationDto<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
