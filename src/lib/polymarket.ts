import { GAMMA_API_BASE, CLOB_API_BASE } from "./constants";
import type {
  GammaMarket,
  PriceHistoryPoint,
  ResolvedMarket,
  MarketsApiResponse,
  MarketCategory,
} from "./types";
import {
  safeJsonParse,
  normalizeCategory,
  determineResolutionIndex,
  findClosestPricePoint,
} from "./utils";

// Simple in-memory cache for price history (survives warm serverless starts)
const priceCache = new Map<string, PriceHistoryPoint[]>();

/**
 * Fetch resolved markets from the Gamma API.
 */
async function fetchResolvedMarkets(
  limit: number,
  offset: number
): Promise<GammaMarket[]> {
  const params = new URLSearchParams({
    closed: "true",
    active: "false",
    limit: String(limit),
    offset: String(offset),
    order: "endDate",
    ascending: "false",
  });

  const url = `${GAMMA_API_BASE}/markets?${params}`;
  const response = await fetchWithRetry(url);

  if (!response.ok) {
    throw new Error(`Gamma API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data as GammaMarket[];
}

/**
 * Fetch price history for a single token from the CLOB API.
 * Tries fine-grained data first, then falls back to coarser intervals.
 */
async function fetchPriceHistory(
  tokenId: string,
  closedTimeISO: string
): Promise<PriceHistoryPoint[]> {
  // Check cache
  const cacheKey = `${tokenId}:${closedTimeISO}`;
  if (priceCache.has(cacheKey)) {
    return priceCache.get(cacheKey)!;
  }

  const closedTimestamp = Math.floor(
    new Date(closedTimeISO).getTime() / 1000
  );

  // Primary attempt: narrow window around close time with fine fidelity
  try {
    const startTs = closedTimestamp - 7200; // 2 hours before
    const endTs = closedTimestamp;
    const params = new URLSearchParams({
      market: tokenId,
      startTs: String(startTs),
      endTs: String(endTs),
      fidelity: "60",
    });

    const url = `${CLOB_API_BASE}/prices-history?${params}`;
    const response = await fetchWithRetry(url);

    if (response.ok) {
      const data = await response.json();
      const history: PriceHistoryPoint[] = data?.history ?? [];
      if (history.length > 0) {
        priceCache.set(cacheKey, history);
        return history;
      }
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: wider window with 1-hour fidelity
  try {
    const startTs = closedTimestamp - 86400; // 24 hours before
    const endTs = closedTimestamp;
    const params = new URLSearchParams({
      market: tokenId,
      startTs: String(startTs),
      endTs: String(endTs),
      fidelity: "720",
    });

    const url = `${CLOB_API_BASE}/prices-history?${params}`;
    const response = await fetchWithRetry(url);

    if (response.ok) {
      const data = await response.json();
      const history: PriceHistoryPoint[] = data?.history ?? [];
      priceCache.set(cacheKey, history);
      return history;
    }
  } catch {
    // Fall through
  }

  // Final fallback: max interval
  try {
    const params = new URLSearchParams({
      market: tokenId,
      interval: "max",
      fidelity: "1440",
    });

    const url = `${CLOB_API_BASE}/prices-history?${params}`;
    const response = await fetchWithRetry(url);

    if (response.ok) {
      const data = await response.json();
      const history: PriceHistoryPoint[] = data?.history ?? [];
      priceCache.set(cacheKey, history);
      return history;
    }
  } catch {
    // Return empty
  }

  priceCache.set(cacheKey, []);
  return [];
}

/**
 * Process a raw GammaMarket into a ResolvedMarket with prediction data.
 */
async function processMarket(raw: GammaMarket): Promise<ResolvedMarket> {
  const outcomes = safeJsonParse<string[]>(raw.outcomes, ["Yes", "No"]);
  const outcomePrices = safeJsonParse<string[]>(raw.outcomePrices, []);
  const clobTokenIds = safeJsonParse<string[]>(raw.clobTokenIds, []);

  // Determine resolution outcome
  const resolvedIndex = determineResolutionIndex(outcomePrices);
  const resolvedOutcome = outcomes[resolvedIndex] ?? "Unknown";

  // Determine close time
  const closedTime = raw.closedTime || raw.endDate;

  // Fetch prediction data (price history for the first/main token)
  let predictionBeforeClose: ResolvedMarket["predictionBeforeClose"] = {
    outcome: "Unknown",
    probability: 0,
    wasCorrect: false,
    dataAvailable: false,
    hoursBeforeClose: 0,
  };

  if (clobTokenIds.length > 0 && closedTime) {
    try {
      const closedTimestamp = Math.floor(
        new Date(closedTime).getTime() / 1000
      );
      const targetTimestamp = closedTimestamp - 3600; // 1 hour before

      // For binary markets, the first token is typically "Yes"
      const yesTokenId = clobTokenIds[0];
      const history = await fetchPriceHistory(yesTokenId, closedTime);

      if (history.length > 0) {
        const closest = findClosestPricePoint(history, targetTimestamp);

        if (closest) {
          const yesProbability = parseFloat(closest.point.p);

          // For binary: if yes probability > 0.5, market predicted "Yes"
          if (outcomes.length <= 2) {
            const predictedIndex = yesProbability >= 0.5 ? 0 : 1;
            const predictedOutcome = outcomes[predictedIndex] ?? "Yes";

            predictionBeforeClose = {
              outcome: predictedOutcome,
              probability:
                predictedIndex === 0
                  ? yesProbability
                  : 1 - yesProbability,
              wasCorrect: predictedIndex === resolvedIndex,
              dataAvailable: true,
              hoursBeforeClose: closest.hoursBefore,
            };
          } else {
            // Multi-outcome: fetch all token prices and find highest
            const allPrices: { index: number; probability: number }[] = [];

            for (let i = 0; i < clobTokenIds.length; i++) {
              try {
                const tokenHistory =
                  i === 0
                    ? history
                    : await fetchPriceHistory(clobTokenIds[i], closedTime);

                const tokenClosest = findClosestPricePoint(
                  tokenHistory,
                  targetTimestamp
                );
                if (tokenClosest) {
                  allPrices.push({
                    index: i,
                    probability: parseFloat(tokenClosest.point.p),
                  });
                }
              } catch {
                // Skip this token
              }
            }

            if (allPrices.length > 0) {
              const highest = allPrices.reduce((a, b) =>
                a.probability > b.probability ? a : b
              );

              predictionBeforeClose = {
                outcome: outcomes[highest.index] ?? "Unknown",
                probability: highest.probability,
                wasCorrect: highest.index === resolvedIndex,
                dataAvailable: true,
                hoursBeforeClose: closest.hoursBefore,
              };
            }
          }
        }
      }
    } catch {
      // Leave prediction as unavailable
    }
  }

  return {
    id: raw.id,
    question: raw.question,
    slug: raw.slug,
    image: raw.image || null,
    outcomes,
    resolvedOutcome,
    resolvedOutcomeIndex: resolvedIndex,
    closedTime,
    category: normalizeCategory(
      raw.category ?? "",
      raw.tags
    ),
    volume: parseFloat(raw.volume) || 0,
    predictionBeforeClose,
  };
}

/**
 * Main entry point: fetch and process a page of resolved markets.
 */
export async function getResolvedMarkets(
  limit: number,
  offset: number,
  category?: string
): Promise<MarketsApiResponse> {
  // Fetch more than needed if filtering by category (server-side filtering)
  const fetchLimit = category && category !== "all" ? limit * 3 : limit;
  const rawMarkets = await fetchResolvedMarkets(fetchLimit, offset);

  // Process markets in batches to respect rate limits
  const batchSize = 5;
  const processed: ResolvedMarket[] = [];

  for (let i = 0; i < rawMarkets.length; i += batchSize) {
    const batch = rawMarkets.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map((market) => processMarket(market))
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        processed.push(result.value);
      }
    }

    // Small delay between batches
    if (i + batchSize < rawMarkets.length) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  // Filter by category if specified
  let filtered = processed;
  if (category && category !== "all") {
    filtered = processed.filter(
      (m) => m.category === (category as MarketCategory)
    );
  }

  // Sort by closedTime descending
  filtered.sort(
    (a, b) =>
      new Date(b.closedTime).getTime() - new Date(a.closedTime).getTime()
  );

  // Trim to requested limit
  const markets = filtered.slice(0, limit);

  return {
    markets,
    nextOffset: markets.length === limit ? offset + limit : null,
    total: markets.length,
  };
}

/**
 * Fetch with retry and exponential backoff.
 */
async function fetchWithRetry(
  url: string,
  maxRetries = 2
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 }, // Cache for 5 minutes in Next.js
      });
      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch: ${url}`);
}
