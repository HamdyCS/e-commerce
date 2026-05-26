import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { cancelApplicationOrder } from "../services/applicationOrderService";
import type { ApplicationOrderDto } from "../dtos/applicationOrder/ApplicationOrderDto";

export function useCancelApplicationOrder() {
  const queryClient = useQueryClient();
  return useMutation<ApplicationOrderDto, AxiosError, string>({
    mutationFn: (applicationId: string) =>
      cancelApplicationOrder(applicationId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        //call api to get order summery
        queryKey: [
          "userApplicationOrderSummary",
          data.applicationId.toString(), //toString() because in useGetUserApplicationOrderSummaryById we use applicationId as string
        ],
      });
      queryClient.invalidateQueries({
        //call api to get all user order summery
        queryKey: ["allUserApplicationOrderSummaries"],
      });
    },
  });
}
