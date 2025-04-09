import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function SkeletonProductPage() {
  return (
    <div className="mx-50 mb-5 grid grid-cols-3 gap-8 border-b-1 pb-8">
      {/* Left side: Main image and thumbnails */}
      <div className="col-span-2">
        <div className="mb-6 flex items-center justify-around">
          <Skeleton className="h-[450px] w-[450px] rounded-xl" />
        </div>

        <div className="flex w-full justify-center gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-[80px] w-[80px] rounded-md" />
          ))}
        </div>
      </div>

      {/* Right side: Product info */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>

        <div className="mb-4 flex items-center">
          <Skeleton className="mr-4 h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Giá */}
        <div className="mb-4">
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="h-6 w-48" />
        </div>

        {/* Chính sách */}
        <div className="mt-12 space-y-3">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-5 w-3/4" />
          ))}
        </div>

        {/* Số lượng và nút thêm */}
        <div className="mt-7">
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-12 w-48 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
