import { useQuery } from "@tanstack/react-query";
import { getShippingCostByCityId } from "../services/shippingCostService";
import type { AxiosError } from "axios";

export function useGetShippingCostByCityId(cityId: number) {
  return useQuery<number, AxiosError>({
    queryKey: ["shippingCost", cityId],
    queryFn: () => getShippingCostByCityId(cityId),
  });
}
