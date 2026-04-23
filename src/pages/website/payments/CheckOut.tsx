import { useTranslation } from "react-i18next";
import Button from "../../../components/ui/Button";
import CheckOutCartItem from "../../../components/website/checkout/CheckOutCartItem";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import type { RootState } from "../../../redux/store/store";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useEffect, useState } from "react";
import type { PaymentMethodType } from "../../../types/PaymentMethodType";
import { useNavigate } from "react-router-dom";
import useGetMyAddresses from "../../../hooks/address";
import CheckOutSkeleton from "../../../components/Skeleton/checkout/CheckOutSkeleton";
import type AddressDto from "../../../dtos/AddressDto";
import { useGetShippingCostByCityId } from "../../../hooks/shippingCost";

export default function CheckOut() {
  const cart = useAppSelector((state: RootState) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cash");

  const { data: addresses, isPending: isAddressesPending } =
    useGetMyAddresses();
  const [selectedAddress, setSelectedAddress] = useState<AddressDto | null>(
    null,
  );
  const { data: shippingCost } = useGetShippingCostByCityId(
    selectedAddress?.cityId || 0,
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  // set default address
  useEffect(() => {
    if (addresses?.length && !selectedAddress) {
      setSelectedAddress(
        addresses.find((address) => address.isDefault) || null,
      );
    }
  }, [addresses]);

  //set shipping cost
  useEffect(() => {}, [selectedAddress]);

  const productElements = cart.cart?.sellerProducts.map((item) => (
    <CheckOutCartItem key={item.sellerProductId} item={item} />
  ));

  //Show skeleton while loading addresses
  if (isAddressesPending) return <CheckOutSkeleton />;

  return (
    <>
      <Helmet>
        <title>{t("Checkout")}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-4 select-none">
        <h1 className="text-2xl font-bold mb-6">{t("Checkout")}</h1>

        <div className="">
          <div>{productElements}</div>

          <div className="mt-10 space-y-7 text-xl">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{t("Cart Items Total")}:</p>
              <p className="font-semibold ">
                ${cart.totalCartPrice.toFixed(2)}
              </p>
            </div>
            <hr className="border-black/20 dark:border-white/20" />
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 ">
                <input
                  type="radio"
                  className="w-5 h-5 accent-blue-500"
                  name="payment-method"
                  id="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <label htmlFor="cash">{t("Cash on Delivery")}</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="w-5 h-5 accent-blue-500"
                  name="payment-method"
                  id="pre-paid"
                  checked={paymentMethod === "pre-paid"}
                  onChange={() => setPaymentMethod("pre-paid")}
                />
                <label htmlFor="pre-paid">{t("Pre-paid")}</label>
              </div>
            </div>
            <hr className="border-black/20 dark:border-white/20" />
            {/* Addresses */}
            {addresses?.length === 0 ? (
              <div className="flex items-center justify-between">
                <p>{t("Please Add Address")}</p>
                <Button
                  text={t("Add Address")}
                  onClick={() => navigate("/my-account/addresses")}
                />
              </div>
            ) : (
              <select
                className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-black"
                value={selectedAddress?.id}
                onChange={(e) =>
                  setSelectedAddress(
                    addresses?.find(
                      (address) => address.id === Number(e.target.value),
                    ) || null,
                  )
                }
              >
                {addresses?.map((address) => (
                  <option key={address.id} value={address.id} className="">
                    {address.address}
                  </option>
                ))}
              </select>
            )}
            <hr className="border-black/20 dark:border-white/20" />
            <div className="flex items-center justify-between">
              <p className="font-semibold">{t("Shipping costs")}:</p>
              <p className="font-semibold">${shippingCost?.toFixed(2) || 0}</p>
            </div>
            <hr className="border-black/20 dark:border-white/20" />
            <div className="flex items-center justify-between">
              <p className="font-semibold">{t("Total")}:</p>
              <p className="font-semibold">
                ${(cart.totalCartPrice + (shippingCost || 0)).toFixed(2)}
              </p>
            </div>
            {/* Proceed to Payment */}
            <div className="flex items-center justify-center">
              <Button
                className=""
                text={t("Proceed to Payment")}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
