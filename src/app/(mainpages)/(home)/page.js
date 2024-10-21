import { Skeleton } from "@/components/ui/skeleton";
import Banner from "./Banner";
import News from "./News";
import Recommened from "./Recommend";
import TopSellers from "./TopSeller";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-4 py-6 font-primary">
      <Banner />

      <section className="py-10">
        <h2 className="mb-6 text-3xl font-semibold">Top Sellers</h2>

        <Suspense fallback={<LoadingSkeleton />}>
          <TopSeller />
        </Suspense>
      </section>
      <section className="py-10">
        <h2 className="mb-6 text-3xl font-semibold">Recommended for you </h2>

        <Suspense fallback={<LoadingSkeleton />}>
          <Recommended />
        </Suspense>
      </section>

      <News />
    </main>
  );
}

async function TopSeller() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <TopSellers />;
}
async function Recommended() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <Recommened />;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-9 w-52" />

      <div className="grid grid-cols-1 justify-between gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 sm:h-72 sm:flex-row sm:items-center sm:justify-center"
          >
            <div className="rounded-md sm:h-72 sm:flex-shrink-0">
              <Skeleton className="h-[300px] w-[250px] rounded-md bg-cover p-2" />
            </div>

            <div>
              <Skeleton className="mb-3 h-6 w-36" />
              <Skeleton className="mb-5 h-4 w-36" />
              <Skeleton className="mb-5 h-4 w-20" />

              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
