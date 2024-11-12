import { Skeleton } from "@/components/ui/skeleton";

export const RecommendLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 justify-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="rounded-lg">
            <div className="flex flex-col gap-4 sm:h-72 sm:flex-row sm:items-center">
              <div className="rounded-md border sm:h-72 sm:flex-shrink-0">
                <Skeleton className="h-72 w-52 rounded-md" />
              </div>

              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TopSellersSkeleton = () => {
  return (
    <>
      <div className="mb-3">
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="grid grid-cols-1 justify-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="rounded-lg">
              <div className="flex flex-col gap-4 sm:h-72 sm:flex-row sm:items-center">
                <div className="rounded-md border sm:h-72 sm:flex-shrink-0">
                  <Skeleton className="h-72 w-52 rounded-md" />
                </div>

                <div className="flex flex-col gap-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
