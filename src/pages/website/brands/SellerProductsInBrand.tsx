import { useMemo } from "react";
import { useParams } from "react-router-dom";
import SellerProducts from "../../../components/website/sellerProducts/SellerProducts";
import { useGetSellerProductsByBrandId } from "../../../hooks/sellerProduct";

export default function SellerProductsInBrand() {
  const { id } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSellerProductsByBrandId(Number(id), 10);

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
