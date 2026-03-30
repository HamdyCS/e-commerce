import { Outlet } from "react-router-dom";
import { useGetActiveCart } from "../../../hooks/cart";

export default function GetActiveCart() {
  const {} = useGetActiveCart();

  return <Outlet />;
}
