import Skeleton from "react-loading-skeleton";
import CustomSkeletonTheme from "../ui/CustomSkeletonTheme";

export default function AddressesSkeleton() {
  return (
    <CustomSkeletonTheme>
      <div className="space-y-7 p-5 w-full max-w-250">
        {/* Skeleton للعنوان */}
        <Skeleton width={150} height={32} className="mb-4" />

        {/* Skeleton لزرار الإضافة */}
        <div className="flex justify-end">
          <Skeleton width={120} height={40} />
        </div>

        {/* Skeleton للكروت (العناوين) */}
        <div className="space-y-7">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-black/10 dark:border-white/10 p-5 rounded-lg flex flex-wrap gap-5 items-center"
            >
              <div className="grow space-y-3">
                <Skeleton height={45} />
              </div>
              <div className="w-40">
                <Skeleton height={45} />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton width={20} height={20} />
                <Skeleton width={100} />
              </div>
              <div className="flex gap-3">
                <Skeleton width={90} height={40} />
                <Skeleton width={90} height={40} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomSkeletonTheme>
  );
}
