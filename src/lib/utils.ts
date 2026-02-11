import {
  formatDistanceToNow,
  format,
  differenceInHours,
  parseISO,
} from "date-fns";
import type { MarketCategory, PriceHistoryPoint } from "./types";
import { CATEGORY_MAP } from "./constants";

/**
 * Format a date string as a human-readable relative time + absolute date.
 * e.g. "3 hours ago" or "Feb 10, 2026"
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "Unknown time";
  }
}

/**
 * Format a date string as an absolute date.
 * e.g. "Feb 10, 2026 at 3:45 PM"
 */
export function formatAbsoluteTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  } catch {
    return "Unknown date";
  }
}

/**
 * Format a probability (0-1) as a percentage string.
 * e.g. 0.73 → "73%"
 */
export function formatProbability(probability: number): string {
  return `${Math.round(probability * 100)}%`;
}

/**
 * Safely parse a JSON string, returning a fallback on failure.
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

/**
 * Normalize a Polymarket category/tag string to our category enum.
 */
export function normalizeCategory(
  rawCategory: string,
  tags?: Array<{ slug: string }>
): MarketCategory {
  // Check the category field first
  const lower = rawCategory?.toLowerCase().trim() ?? "";
  if (CATEGORY_MAP[lower]) {
    return CATEGORY_MAP[lower];
  }

  // Check tags
  if (tags) {
    for (const tag of tags) {
      const tagLower = tag.slug.toLowerCase().trim();
      if (CATEGORY_MAP[tagLower]) {
        return CATEGORY_MAP[tagLower];
      }
    }
  }

  return "other";
}

/**
 * Determine the resolved outcome from outcomePrices.
 * Returns the index of the winning outcome (price ≈ 1.0).
 */
export function determineResolutionIndex(outcomePrices: string[]): number {
  for (let i = 0; i < outcomePrices.length; i++) {
    const price = parseFloat(outcomePrices[i]);
    if (price > 0.95) {
      return i;
    }
  }
  // Fallback: return the index with the highest price
  let maxIndex = 0;
  let maxPrice = 0;
  for (let i = 0; i < outcomePrices.length; i++) {
    const price = parseFloat(outcomePrices[i]);
    if (price > maxPrice) {
      maxPrice = price;
      maxIndex = i;
    }
  }
  return maxIndex;
}

/**
 * Find the price point closest to (but before) a target timestamp.
 * Returns the price point and the hours difference from the target.
 */
export function findClosestPricePoint(
  history: PriceHistoryPoint[],
  targetTimestamp: number
): { point: PriceHistoryPoint; hoursBefore: number } | null {
  if (!history || history.length === 0) return null;

  let closest: PriceHistoryPoint | null = null;
  let closestDiff = Infinity;

  for (const point of history) {
    const diff = targetTimestamp - point.t;
    // We want points BEFORE the target (diff > 0), as close as possible
    if (diff >= 0 && diff < closestDiff) {
      closest = point;
      closestDiff = diff;
    }
  }

  // If no point before target, take the closest one overall
  if (!closest) {
    for (const point of history) {
      const diff = Math.abs(targetTimestamp - point.t);
      if (diff < closestDiff) {
        closest = point;
        closestDiff = diff;
      }
    }
  }

  if (!closest) return null;

  const hoursBefore = Math.abs(targetTimestamp - closest.t) / 3600;
  return { point: closest, hoursBefore };
}

/**
 * Format the hours-before value for display.
 * e.g. 1.2 → "1h before", 12.5 → "~12h before"
 */
export function formatHoursBefore(hours: number): string {
  if (hours < 2) return "1h before";
  if (hours < 6) return `~${Math.round(hours)}h before`;
  if (hours < 18) return "~12h before";
  return `~${Math.round(hours / 24)}d before`;
}

/**
 * Calculate hours difference between two date strings.
 */
export function hoursDifference(
  dateA: string | Date,
  dateB: string | Date
): number {
  const a = typeof dateA === "string" ? parseISO(dateA) : dateA;
  const b = typeof dateB === "string" ? parseISO(dateB) : dateB;
  return Math.abs(differenceInHours(a, b));
}

/**
 * Format volume as a readable string.
 * e.g. 1500000 → "$1.5M"
 */
export function formatVolume(volume: number): string {
  if (volume >= 1_000_000) {
    return `$${(volume / 1_000_000).toFixed(1)}M`;
  }
  if (volume >= 1_000) {
    return `$${(volume / 1_000).toFixed(1)}K`;
  }
  return `$${volume.toFixed(0)}`;
}
