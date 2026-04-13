import config from "../config";
import { Axios } from "../api/Axios";
import type AddressDto from "../dtos/AddressDto";
import type AddAddressDto from "../dtos/AddAddressDto";

export default async function getMyAddresses() {
  const response = await Axios.get<AddressDto[]>(config.address.getAll);
  return response.data;
}

export async function addNewAddress(addAddressDto: AddAddressDto) {
  const response = await Axios.post<AddressDto>(
    config.address.addNew,
    addAddressDto,
  );
  return response.data;
}

export async function updateAddress(id: number, addressDto: AddressDto) {
  const response = await Axios.put(
    `${config.address.update}/${id}`,
    addressDto,
  );
  return response.data;
}

export async function deleteAddress(id: number) {
  const response = await Axios.delete(`${config.address.delete}/${id}`);
  return response.data;
}
