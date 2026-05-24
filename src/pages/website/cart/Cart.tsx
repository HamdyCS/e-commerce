import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import CartItem from "../../../components/website/cart/CartItem";
import { useAppSelector } from "../../../redux/hook/reduxHooks";
import type { RootState } from "../../../redux/store/store";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Cart() {
  const cart = useAppSelector((state: RootState) => state.cart);
  const { t } = useTranslation();

  const navigate = useNavigate();

  //product elements
  const productElements = cart?.cart?.sellerProducts.map((item) => (
    <CartItem key={item.sellerProductId} item={item} />
  ));

  return (
    <>
      <Helmet>
        <title>{t("Cart")}</title>
      </Helmet>
      <div>
        <div className=" overflow-x-auto">
          <table className="min-w-200 table-fixed w-full border-separate border-spacing-y-10 -mt-5">
            <thead>
              <tr className="*:capitalize">
                <th className="text-center "> {t("product")}</th>
                <th className="text-center ">{t("price")}</th>
                <th className="text-center ">{t("quantity")}</th>
                <th className="text-center ">{t("total")}</th>
              </tr>
            </thead>
            <tbody>{productElements}</tbody>
          </table>
        </div>
        <div className="flex items-center justify-end mt-10">
          <div className="border border-black/20 dark:border-white/20 p-5 w-full md:w-min-card rounded-md">
            <div className="flex items-center justify-between">
              <p className="font-bold text-xl">{t("Cart Total")}:</p>
              <p className="font-bold text-xl">
                {cart.totalCartPrice.toFixed(2)}
              </p>
            </div>
            <hr className="my-5 border-black/20 dark:border-white/20" />
            <div className="flex items-center justify-center">
              <Button
                className="mx-5"
                disabled={cart?.cart?.sellerProducts.length === 0}
                text={t("Check out")}
                onClick={() => navigate("/checkout")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
