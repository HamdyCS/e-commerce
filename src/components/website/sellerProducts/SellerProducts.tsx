import { useEffect } from "react";
import type { SellerProductDto } from "../../../dtos/SellerProductDto";
import SellerProductCard from "./SellerProductCard";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import CustomSkeletonTheme from "../../ui/CustomSkeletonTheme";

interface SellerProductsProps {
  data: SellerProductDto[] | undefined;
  handleFetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export default function SellerProducts({
  data,
  handleFetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: SellerProductsProps) {
  const { ref, inView } = useInView({
    threshold: 0, // when 0% of the element is visible بمجرد مايظهر
    rootMargin: "100px", // قبل مايظهر ب 100 بكسل فرصة انه يحمل
  });

  //fetch next page when inView and hasNextPage and not fetchingNextPage
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) handleFetchNextPage();
  }, [inView, isFetchingNextPage]);

  //skeleton
  const skeletonElements = Array.from({ length: 4 }).map((_, index) => (
    <div className="w-full">
      <Skeleton key={index} className="w-full" height={200} />
    </div>
  ));

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5">
        {data?.map((sellerProduct) => (
          <SellerProductCard
            key={sellerProduct.id}
            sellerProduct={sellerProduct}
          />
        ))}
        <div className="h-5" ref={ref}></div>
      </div>

      {isFetchingNextPage && (
        <CustomSkeletonTheme>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5">
            {skeletonElements}
          </div>
        </CustomSkeletonTheme>
      )}
    </div>
  );
}
