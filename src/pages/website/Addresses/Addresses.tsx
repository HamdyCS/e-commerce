import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../components/ui/Button";
import AddAddressModel from "../../../components/website/Addresses/AddAddressModel";
import Address from "../../../components/website/Addresses/Address";
import useGetMyAddresses from "../../../hooks/address";
import useGetAllCities from "../../../hooks/city";
import AddressesSkeleton from "../../../components/Skeleton/AddressesSkeleton";

export default function Addresses() {
  const { t } = useTranslation();

  const { data: addresses, isPending: isPendingAddresses } =
    useGetMyAddresses();
  const [showAddAddressModel, setShowAddAddressModel] = useState(false);

  //load cities for address model to show skeleton here
  const { isPending: isPendingCities } = useGetAllCities();

  const addressElements = useMemo(() => {
    if (!addresses) return null;

    return addresses.map((address) => (
      <Address key={address.id} address={address} />
    ));
  }, [addresses]);

  //show skeleton while loading
  if ((isPendingAddresses && isPendingCities)) {
    return <AddressesSkeleton />;
  }

  return (
    <div className="space-y-7 p-5 w-full max-w-250">
      <AnimatePresence mode="wait">
        {showAddAddressModel && (
          <AddAddressModel onExit={() => setShowAddAddressModel(false)} />
        )}
      </AnimatePresence>
      <h2 className="text-2xl font-bold">{t("Addresses")}</h2>
      {/* <div className="border-b mt-9 border-b-black/20 dark:border-b-white/20" /> */}
      <div className="flex justify-end">
        <Button
          text={t("Add Address")}
          onClick={() => setShowAddAddressModel(true)}
        />
      </div>
      <div className="space-y-7">
        {!addresses?.length ? (
          <div
            className="border border-black/20 dark:border-white/20 flex items-center gap-2 
      justify-center p-5 rounded-lg"
          >
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              size="xl"
              className="text-yellow-500"
            />
            <p className="text-center">
              {t("No Addresses Found Please Add One")}
            </p>
          </div>
        ) : (
          addressElements
        )}
      </div>
    </div>
  );
}
