import type CityDto from "./cityDto";

export default interface AddressDto {
  id: number;
  address: string;
  cityId: number;
  isDefault: boolean;
  city: CityDto;
}
