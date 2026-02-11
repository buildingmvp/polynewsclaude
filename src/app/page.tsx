import { getResolvedMarkets } from "@/lib/polymarket";
import Header from "@/components/Header";
import MarketFeed from "@/components/MarketFeed";
import Footer from "@/components/Footer";
import { MARKETS_PER_PAGE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let initialData;

  try {
    initialData = await getResolvedMarkets(MARKETS_PER_PAGE, 0);
  } catch (error) {
    console.error("Failed to fetch initial markets:", error);
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 sm:py-8">
        {/* Hero section */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-poly-text tracking-tight">
            Resolved Markets
          </h2>
          <p className="text-sm text-poly-text-secondary mt-1">
            What prediction markets predicted 12 hours before resolution — and
            whether they were right.
          </p>
        </div>

        <MarketFeed initialData={initialData} />
      </div>

      <Footer />
    </main>
  );
}
