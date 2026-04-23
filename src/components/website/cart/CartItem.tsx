import type CartItemDto from "../../../dtos/CartItemDto";
import logo from "../../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import {
  useDeleteItemFromCart,
  useUpdateCartItemQuantity,
} from "../../../hooks/cart";
import Counter from "../../ui/Counter";

interface CartItemProps {
  item: CartItemDto;
}

export default function CartItem({ item }: CartItemProps) {
  const { i18n } = useTranslation();
  const { mutate: deleteItem, isPending: isPendingDeleteItem } =
    useDeleteItemFromCart();
  const { mutate: updateItem, isPending: isPendingUpdateItem } =
    useUpdateCartItemQuantity();

  return (
    <tr key={item.sellerProductId}>
      <td className="text-center relative border-b border-black/20 dark:border-white/20">
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
        <button disabled={isPendingDeleteItem}>
          <FontAwesomeIcon
            icon={faX}
            onClick={() => deleteItem(item)}
            cursor="pointer"
            className="absolute rounded-full -top-1/2 ltr:left-2 rtl:right-0 p-2 text-red-500 hover:text-blue-500 transition-all duration-300"
          />
        </button>
      </td>
      <td className="text-center border-b border-black/20 dark:border-white/20">
        {item.totalPrice / item.quantity}
      </td>
      <td className="text-center border-b border-black/20 dark:border-white/20 ">
        <div className="flex items-center justify-center">
          <Counter
            min={1}
            max={1000}
            value={item.quantity}
            onChange={(value) => {
              updateItem({
                cartItem: {
                  ...item,
                  quantity: value,
                },
                sellerProductInShoppingCartId: item.id || 0,
              });
            }}
            loading={isPendingUpdateItem}
          />
        </div>
      </td>
      <td className="text-center border-b border-black/20 dark:border-white/20">
        {item.totalPrice}
      </td>
    </tr>
  );
}
