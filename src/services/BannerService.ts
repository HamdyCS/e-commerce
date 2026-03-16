import { Axios } from "../api/Axios";
import config from "../config";
import type BannerDto from "../dtos/BannerDto";

export async function getAllActiveBanners() {
  const response = await Axios.get<BannerDto[]>(
    `${config.baseUrl}${config.banner.getAllActive}`,
  );
  return response.data;
}
