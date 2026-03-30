import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import type { RootState } from "../../../redux/store/store";
import logo from "../../../assets/logo.png";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteItemFromCart } from "../../../hooks/cart";

export default function Cart() {
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const { t, i18n } = useTranslation();
  const { mutate, isPending } = useDeleteItemFromCart();

  //product elements
  const productElements = cart?.sellerProducts.map((item) => (
    <tr key={item.sellerProductId}>
      <td className="text-center relative">
        <div className="inline-flex items-center gap-10 ">
          <div className="min-w-20 min-h-20 max-w-20 max-h-20">
            <img
              className="w-full h-full object-cover"
              src={item.productImageUrl || logo}
              alt={item.productNameEn}
            />
          </div>
          <p>
            {i18n.language === "ar" ? item.productNameAr : item.productNameEn}
          </p>
        </div>
        <button disabled={isPending}>
          <FontAwesomeIcon
            icon={faX}
            onClick={() => mutate(item)}
            cursor="pointer"
            className="absolute rounded-full -top-5 left-0 bg-red-500 hover:bg-blue-500 text-white p-2"
          />
        </button>
      </td>
      <td className="text-center">{item.totalPrice / item.quantity}</td>
      <td className="text-center">{item.quantity}</td>
      <td className="text-center">{item.totalPrice}</td>
    </tr>
  ));

  return (
    <div className=" overflow-x-auto">
      <table className="min-w-200 table-fixed w-full border-separate border-spacing-y-10 -mt-5">
        <thead>
          <tr className="*:capitalize">
            <th className="text-center"> {t("product")}</th>
            <th className="text-center">{t("price")}</th>
            <th className="text-center">{t("quantity")}</th>
            <th className="text-center">{t("total")}</th>
          </tr>
        </thead>
        <tbody>{productElements}</tbody>
      </table>
    </div>
  );
}
