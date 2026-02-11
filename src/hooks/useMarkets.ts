import useSWRInfinite from "swr/infinite";
import { fetchMarkets } from "@/lib/api";
import { MARKETS_PER_PAGE } from "@/lib/constants";
import type { MarketsApiResponse, ResolvedMarket } from "@/lib/types";

export function useMarkets(
  category: string,
  fallbackData?: MarketsApiResponse
) {
  const getKey = (
    pageIndex: number,
    previousPageData: MarketsApiResponse | null
  ) => {
    // End of data
    if (previousPageData && previousPageData.nextOffset === null) return null;

    const offset = pageIndex * MARKETS_PER_PAGE;
    return ["/api/markets", MARKETS_PER_PAGE, offset, category] as const;
  };

  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      getKey,
      ([, limit, offset, cat]) =>
        fetchMarkets(limit, offset, cat === "all" ? undefined : cat),
      {
        fallbackData: fallbackData ? [fallbackData] : undefined,
        revalidateOnFocus: false,
        revalidateFirstPage: false,
        revalidateOnReconnect: false,
      }
    );

  const markets: ResolvedMarket[] = data
    ? data.flatMap((page) => page.markets)
    : [];

  const isLoadingMore =
    isLoading ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.markets.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.nextOffset === null);

  return {
    markets,
    error,
    isLoading,
    isLoadingMore,
    isValidating,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
    size,
  };
}
