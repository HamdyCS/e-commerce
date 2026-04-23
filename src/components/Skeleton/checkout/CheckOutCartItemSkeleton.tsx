import Skeleton from "react-loading-skeleton";

export default function CheckOutCartItemSkeleton() {
  return (
    <div className="grid justify-items-center items-center md:justify-items-start grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="min-w-20 min-h-20 max-w-20 max-h-20">
        <Skeleton width={80} height={80} className="rounded-lg" />
      </div>
      <div className="flex-1 w-full">
        <Skeleton width="80%" height={24} />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton width={100} height={40} />
      </div>
      <div className="justify-self-center">
        <Skeleton width={60} height={24} />
      </div>
    </div>
  );
}
