import { Skeleton } from "@/components/ui/skeleton";
import Banner from "./Banner";
import News from "./News";
import Recommened from "./Recommend";
import TopSellers from "./TopSeller";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="min-h-screen max-w-screen-xl mx-auto px-4 py-6 font-primary">
      <Banner />

      <section className="py-10">
        <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

        <Suspense fallback={<LoadingSkeleton />}>
          <TopSeller />
        </Suspense>
      </section>
      <section className="py-10">
        <h2 className="text-3xl font-semibold mb-6">Recommended for you </h2>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 justify-between xl:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
            <div className="sm:h-72 sm:flex-shrink-0 rounded-md">
              <Skeleton className="w-[250px] h-[300px] bg-cover p-2 rounded-md" />
            </div>

            <div>
              <Skeleton className="h-6 w-36 mb-3" />
              <Skeleton className="h-4 w-36 mb-5" />
              <Skeleton className="h-4 w-20 mb-5" />

              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
