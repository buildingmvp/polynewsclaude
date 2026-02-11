"use client";

import { useState, useEffect } from "react";
import type { MarketsApiResponse } from "@/lib/types";
import { useMarkets } from "@/hooks/useMarkets";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import CategoryFilter from "./CategoryFilter";
import MarketCard from "./MarketCard";
import LoadingCard from "./LoadingCard";
import ErrorState from "./ErrorState";

interface MarketFeedProps {
  initialData?: MarketsApiResponse;
}

export default function MarketFeed({ initialData }: MarketFeedProps) {
  const [category, setCategory] = useState("all");
  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver();

  const {
    markets,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    isValidating,
  } = useMarkets(category, category === "all" ? initialData : undefined);

  // Infinite scroll: load more when sentinel enters viewport
  useEffect(() => {
    if (isIntersecting && !isLoadingMore && !isReachingEnd && !isValidating) {
      loadMore();
    }
  }, [isIntersecting, isLoadingMore, isReachingEnd, isValidating, loadMore]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <div className="space-y-6">
      {/* Category filter bar */}
      <CategoryFilter
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Market feed */}
      <div className="space-y-3">
        {/* Error state */}
        {error && !isLoading && (
          <ErrorState
            message="Failed to load markets. The Polymarket API may be temporarily unavailable."
            onRetry={loadMore}
          />
        )}

        {/* Market cards */}
        {markets.map((market, index) => (
          <div
            key={market.id}
            className="animate-fade-in opacity-0"
            style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}
          >
            <MarketCard market={market} />
          </div>
        ))}

        {/* Loading skeletons */}
        {(isLoading || isLoadingMore) && (
          <div className="space-y-3">
            {Array.from({ length: isLoading ? 8 : 3 }).map((_, i) => (
              <LoadingCard key={`loading-${i}`} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && markets.length === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-poly-text-tertiary"
              >
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-poly-text-secondary text-sm">
              No resolved markets found for this category.
            </p>
            <p className="text-poly-text-tertiary text-xs mt-1">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* End of feed */}
        {isReachingEnd && markets.length > 0 && (
          <p className="text-center text-poly-text-tertiary text-xs py-8">
            You&apos;ve reached the end of resolved markets.
          </p>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-4" />
      </div>
    </div>
  );
}
