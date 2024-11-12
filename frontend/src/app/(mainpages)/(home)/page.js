import Banner from "./Banner";
import News from "./News";
import TopSellers from "./TopSeller";
import Recommended from "./Recommend";

export default async function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-4 py-6 font-primary">
      <Banner />

      <section className="py-10">
        <h2 className="mb-6 text-3xl font-semibold">Top Sellers</h2>
        <TopSellers />
      </section>

      <section className="py-10">
        <h2 className="mb-6 text-3xl font-semibold">Recommended for you</h2>
        <Recommended />
      </section>

      <News />
    </main>
  );
}
