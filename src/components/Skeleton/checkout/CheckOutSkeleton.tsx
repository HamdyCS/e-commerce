import Skeleton from "react-loading-skeleton";
import CustomSkeletonTheme from "../../ui/CustomSkeletonTheme";
import CheckOutCartItemSkeleton from "./CheckOutCartItemSkeleton";

export default function CheckOutSkeleton() {
  return (
    <CustomSkeletonTheme>
      <div className="max-w-4xl mx-auto p-4 select-none">
        <h1 className="mb-6">
          <Skeleton width={150} height={32} />
        </h1>

        <div className="">
          <div>
            {[1, 2, 3].map((i) => (
              <CheckOutCartItemSkeleton key={i} />
            ))}
          </div>

          <div className="mt-10 space-y-7 text-xl">
            <div className="flex items-center justify-between">
              <Skeleton width={150} height={28} />
              <Skeleton width={100} height={28} />
            </div>
            <hr className="border-black/20 dark:border-white/20" />
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={120} height={24} />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={120} height={24} />
              </div>
            </div>
            <hr className="border-black/20 dark:border-white/20" />
            <div>
              <Skeleton width="100%" height={45} />
            </div>
            <div className="flex items-center justify-center">
              <Skeleton width={200} height={45} />
            </div>
          </div>
        </div>
      </div>
    </CustomSkeletonTheme>
  );
}
