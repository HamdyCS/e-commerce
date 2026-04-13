import { useQuery } from "@tanstack/react-query";
import { getAllCities } from "../services/cityService";
import type CityDto from "../dtos/cityDto";

export default function useGetAllCities() {
  return useQuery<CityDto[]>({
    queryKey: ["cities"],
    queryFn: getAllCities,
  });
}
