import { useQuery } from "@tanstack/react-query";
import { getAllActiveBanners } from "../services/BannerService";
import type BannerDto from "../dtos/BannerDto";

export function useGetAllActiveBanners() {
  return useQuery<BannerDto[]>({
    queryKey: ["active-banners"],
    queryFn: getAllActiveBanners,
  });
}
