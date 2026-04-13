import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getMyAddresses, {
  addNewAddress,
  deleteAddress,
  updateAddress,
} from "../services/addressService";
import type AddressDto from "../dtos/AddressDto";
import type { AxiosError } from "axios";
import type AddAddressDto from "../dtos/AddAddressDto";
import type { HookOptions } from "./types/HookOptions";

export default function useGetMyAddresses() {
  return useQuery<AddressDto[]>({
    queryKey: ["my-addresses"],
    queryFn: getMyAddresses,
  });
}

export function useAddNewAddress(options: HookOptions<AddressDto>) {
  const queryClient = useQueryClient();
  return useMutation<AddressDto, AxiosError, AddAddressDto>({
    mutationFn: addNewAddress,
    onSuccess: (data) => {
      //refetch the query to get the new data
      queryClient.invalidateQueries({ queryKey: ["my-addresses"] });

      //call the onSuccess callback if it exists
      options.onSuccess?.(data);
    },
    onError: (error) => {
      //call the onError callback if it exists
      options.onError?.(error);
    },
  });
}

export function useUpdateAddress(options: HookOptions<AddressDto>) {
  const queryClient = useQueryClient();
  return useMutation<
    AddressDto,
    AxiosError,
    { id: number; addressDto: AddressDto }
  >({
    mutationFn: ({ id, addressDto }) => updateAddress(id, addressDto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-addresses"] });
      options.onSuccess?.(data);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
}

export function useDeleteAddress(options: HookOptions<void>) {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, number>({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-addresses"] });
      options.onSuccess?.();
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
}