import { Axios } from "../api/Axios";
import config from "../config";
import type ApplicationOrderSummaryDto from "../dtos/ApplicationOrder/ApplicationOrderSummaryDto";

export async function getLatestUserApplicationOrderSummary(): Promise<ApplicationOrderSummaryDto> {
  const res = await Axios.get<ApplicationOrderSummaryDto>(
    config.applicationOrderSummery.latest,
  );
  return res.data;
}

export async function getAllUserApplicationOrderSummaries(): Promise<
  ApplicationOrderSummaryDto[]
> {
  const res = await Axios.get<ApplicationOrderSummaryDto[]>(
    config.applicationOrderSummery.all,
  );
  return res.data;
}

export async function getApplicationOrderSummaryById(
  applicationId: string,
): Promise<ApplicationOrderSummaryDto> {
  const res = await Axios.get<ApplicationOrderSummaryDto>(
    config.applicationOrderSummery.getById(applicationId),
  );
  return res.data;
}

