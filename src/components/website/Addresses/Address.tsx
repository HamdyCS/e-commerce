import { useFormik } from "formik";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import type AddressDto from "../../../dtos/AddressDto";
import CitySelector from "../../ui/CitySelector";
import Input from "../../ui/Input";
import FieldError from "../../ui/FieldError";
import Button from "../../ui/Button";

import { useDeleteAddress, useUpdateAddress } from "../../../hooks/address";
import toast from "react-hot-toast";

interface AddressProps {
  address: AddressDto;
}

const validationSchema = Yup.object({
  address: Yup.string()
    .required("Street is required")
    .min(3, "Street must be at least 3 characters long")
    .max(100, "Street must be at most 100 characters long"),
  cityId: Yup.number().required("City is required"),
  isDefault: Yup.boolean(),
});

export default function Address({ address }: AddressProps) {
  const { t } = useTranslation();

  const { mutate: updateAddress, isPending: isPendingUpdate } =
    useUpdateAddress({
      onSuccess: () => {
        toast.success(t("Address updated successfully"));
      },
      onError: () => {
        toast.error(t("Failed to update address"));
      },
    });

  const { mutate: deleteAddress, isPending: isPendingDelete } =
    useDeleteAddress({
      onSuccess: () => {
        toast.success(t("Address deleted successfully"));
      },
      onError: () => {
        toast.error(t("Failed to delete address"));
      },
    });

  const fomik = useFormik({
    initialValues: address,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      updateAddress({ id: address.id, addressDto: values });
    },
  });
  const focusInput = useRef<HTMLInputElement | null>(null);

  return (
    <form
      onSubmit={fomik.handleSubmit}
      className="border border-black/20 dark:border-white/20 flex flex-wrap items-center justify-between p-5 rounded-lg gap-5"
    >
      <div className="space-y-4 grow">
        <Input
          placeholder={t("Street")}
          ref={focusInput}
          value={fomik.values.address}
          onChange={fomik.handleChange}
          name="address"
        />
        {fomik.errors.address && fomik.touched.address && (
          <FieldError error={fomik.errors.address} />
        )}
      </div>
      <CitySelector
        value={fomik.values.cityId}
        onChange={(e) => fomik.setFieldValue("cityId", e.target.value)}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDefault"
          id="isDefault"
          className="w-5 h-5 cursor-pointer accent-blue-500"
          checked={fomik.values.isDefault}
          onChange={fomik.handleChange}
        />
        <label htmlFor="isDefault" className="text-nowrap">
          {t("Set as Default")}
        </label>
      </div>
      <div className="flex gap-5 ">
        <Button
          type="submit"
          text={t("Update")}
          isLoading={isPendingUpdate}
          disabled={isPendingUpdate}
        />
        <Button
          type="button"
          text={t("Delete")}
          className="bg-red-500 hover:bg-red-600"
          isLoading={isPendingDelete}
          disabled={isPendingDelete}
          onClick={() => deleteAddress(address.id)}
        />
      </div>
    </form>
  );
}
