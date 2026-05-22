import { useQuery } from "@tanstack/react-query";
import type ApplicationOrderSummaryDto from "../dtos/ApplicationOrder/ApplicationOrderSummaryDto";
import type { AxiosError } from "axios";
import { getLatestUserApplicationOrderSummary } from "../services/applicationOrderSummery";

export function useGetLatestUserApplicationOrderSummary() {
  return useQuery<ApplicationOrderSummaryDto, AxiosError>({
    queryKey: ["latestUserApplicationOrderSummary"],
    queryFn: () => getLatestUserApplicationOrderSummary(),
  });
}
