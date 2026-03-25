import { useMemo } from "react";
import { useParams } from "react-router-dom";
import SellerProducts from "../../../components/website/sellerProducts/SellerProducts";
import { useGetSellerProductsByCategoryId } from "../../../hooks/sellerProduct";

export default function SellerProductsInCategory() {
  const { id } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSellerProductsByCategoryId(Number(id), 10);

  const sellerProducts = useMemo(() => {
    return data?.pages.flatMap((s) => s.data);
  }, [data]);

  return (
    <div>
      <SellerProducts
        data={sellerProducts}
        handleFetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
