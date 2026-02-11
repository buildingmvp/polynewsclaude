import type { MarketsApiResponse } from "./types";

/**
 * Fetch resolved markets from our API proxy.
 */
export async function fetchMarkets(
  limit: number,
  offset: number,
  category?: string
): Promise<MarketsApiResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (category && category !== "all") {
    params.set("category", category);
  }

  const res = await fetch(`/api/markets?${params}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch markets: ${res.status}`);
  }

  return res.json();
}
