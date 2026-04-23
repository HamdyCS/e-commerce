import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.png";
import type CartItemDto from "../../../dtos/CartItemDto";
import { useDeleteItemFromCart, useUpdateCartItemQuantity } from "../../../hooks/cart";
import Counter from "../../ui/Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface CheckOutCartItemProps {
  item: CartItemDto;
}

export default function CheckOutCartItem({ item }: CheckOutCartItemProps) {
  const { mutate, isPending } = useUpdateCartItemQuantity();
  const { mutate: deleteItem, isPending: isPendingDeleteItem } =
    useDeleteItemFromCart();
    
  const { i18n } = useTranslation();

  return (
    <div className="grid justify-items-center items-center md:justify-items-start grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 ">
      <div className="min-w-20 min-h-20 max-w-20 max-h-20 relative">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={item.productImageUrl || logo}
          alt={item.productNameEn}
        />
        <button disabled={isPendingDeleteItem}>
          <FontAwesomeIcon
            icon={faX}
            onClick={() => deleteItem(item)}
            cursor="pointer"
            className="absolute rounded-full -top-1/4  ltr:-left-1/2 rtl:-right-1/2 p-2 text-red-500 hover:text-blue-500 transition-all duration-300"
          />
        </button>
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-wrap">
          {i18n.language === "ar" ? item.productNameAr : item.productNameEn}
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <Counter
          min={1}
          max={1000}
          value={item.quantity}
          onChange={(value) => {
            mutate({
              cartItem: {
                ...item,
                quantity: value,
              },
              sellerProductInShoppingCartId: item.id || 0,
            });
          }}
          loading={isPending}
        />
      </div>
      <div className="font-medium justify-self-center">
        ${item.totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
