import { Axios } from "../api/Axios";
import config from "../config";
import type CityDto from "../dtos/cityDto";

export const getAllCities = async () => {
  const response = await Axios.get<CityDto[]>(config.city.getAll);
  return response.data;
};
