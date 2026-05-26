import { Axios } from "../api/Axios";
import config from "../config";
import type { ApplicationOrderDto } from "../dtos/applicationOrder/ApplicationOrderDto";

export async function cancelApplicationOrder(applicationId: string) {
  const response = await Axios.post<ApplicationOrderDto>(
    `${config.applicationOrder.cancel(applicationId)}`,
  );
  return response.data;
}
