import { useQuery } from "@tanstack/react-query";
import type ApplicationOrderSummaryDto from "../dtos/applicationOrder/ApplicationOrderSummaryDto";
import type { AxiosError } from "axios";
import {
  getAllUserApplicationOrderSummaries,
  getApplicationOrderSummaryById,
  getLatestUserApplicationOrderSummary,
} from "../services/applicationOrderSummeryService";

export function useGetLatestUserApplicationOrderSummary() {
  return useQuery<ApplicationOrderSummaryDto, AxiosError>({
    queryKey: ["latestUserApplicationOrderSummary"],
    queryFn: () => getLatestUserApplicationOrderSummary(),
  });
}

export function useGetAllUserApplicationOrderSummaries() {
  return useQuery<ApplicationOrderSummaryDto[], AxiosError>({
    queryKey: ["allUserApplicationOrderSummaries"],
    queryFn: () => getAllUserApplicationOrderSummaries(),
  });
}

export function useGetUserApplicationOrderSummaryById(applicationId: string) {
  return useQuery<ApplicationOrderSummaryDto, AxiosError>({
    queryKey: ["userApplicationOrderSummary", applicationId],
    queryFn: () => getApplicationOrderSummaryById(applicationId),
  });
}
