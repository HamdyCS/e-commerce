import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import * as Yup from "yup";
import type AddAddressDto from "../../../dtos/AddAddressDto";
import { useAddNewAddress } from "../../../hooks/address";
import Button from "../../ui/Button";
import CitySelector from "../../ui/CitySelector";
import FieldError from "../../ui/FieldError";
import Input from "../../ui/Input";
import useGetAllCities from "../../../hooks/city";

interface AddAddressModelProps {
  onExit: () => void;
}

const validationSchema = Yup.object({
  address: Yup.string()
    .required("Street is required")
    .min(3, "Street must be at least 3 characters long")
    .max(100, "Street must be at most 100 characters long"),
  cityId: Yup.number().required("City is required"),
  isDefault: Yup.boolean(),
});

export default function AddAddressModel({ onExit }: AddAddressModelProps) {
  const { t } = useTranslation();

  //get all cities to show to select first item as default
  const { data: cities, isPending: isPendingCities } = useGetAllCities();

  const initialValues: AddAddressDto = {
    address: "",
    cityId: cities?.[0]?.id || 0,
    isDefault: false,
  };

  const { mutate, isPending } = useAddNewAddress({
    onSuccess: () => {
      toast.success(t("Address added successfully"));
      onExit();
    },
    onError: () => {
      toast.error(t("Failed to add address"));
    },
  });

  const fomik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  const focusInput = useRef<HTMLInputElement | null>(null);

  // focus on input when model open
  useEffect(() => {
    focusInput.current?.focus();
  }, []);

  //exit on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onExit]);

  return (
    <>
      <div
        onClick={onExit}
        className="fixed inset-0 bg-black/50 w-screen h-screen z-50"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black  p-5 rounded-lg shadow-lg z-51 space-y-7 w-90 lg:w-120 "
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t("Add Address")}</h2>
          <FontAwesomeIcon
            icon={faX}
            className="cursor-pointer text-red-500"
            onClick={onExit}
          />
        </div>
        {isPendingCities ? (
          <div className="space-y-7">
            <div>
              <Skeleton height={50} />
            </div>
            <div>
              <Skeleton height={50} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton width={20} height={20} />
              <Skeleton width={120} height={20} />
            </div>
            <div className="flex justify-end">
              <Skeleton width={80} height={40} />
            </div>
          </div>
        ) : (
          <form className="space-y-7" onSubmit={fomik.handleSubmit}>
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
              <label htmlFor="isDefault">{t("Set as Default")}</label>
            </div>
            <div className="flex justify-end">
              <Button
                disabled={isPending}
                isLoading={isPending}
                type="submit"
                text={t("Save")}
              />
            </div>
          </form>
        )}
      </motion.div>
    </>
  );
}
