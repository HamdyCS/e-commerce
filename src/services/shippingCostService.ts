import { Axios } from "../api/Axios";
import config from "../config";

export async function getShippingCostByCityId(cityId: number) {
  const res = await Axios.get<number>(
    `${config.shippingCost.getShippingCostByCityId}/${cityId}`,
  );

  return res.data;
}
