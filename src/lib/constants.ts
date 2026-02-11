import type { MarketCategory } from "./types";

export const GAMMA_API_BASE = "https://gamma-api.polymarket.com";
export const CLOB_API_BASE = "https://clob.polymarket.com";

export const MARKETS_PER_PAGE = 50;

export const CATEGORIES: { label: string; value: MarketCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Politics", value: "politics" },
  { label: "Economics", value: "economics" },
  { label: "Culture", value: "culture" },
  { label: "Tech", value: "tech" },
  { label: "Geopolitics", value: "geopolitics" },
  { label: "Sports", value: "sports" },
  { label: "Other", value: "other" },
];

// Map Polymarket's category/tag strings to our normalized categories
export const CATEGORY_MAP: Record<string, MarketCategory> = {
  politics: "politics",
  "us-politics": "politics",
  elections: "politics",
  "us-elections": "politics",
  economics: "economics",
  finance: "economics",
  crypto: "economics",
  business: "economics",
  culture: "culture",
  entertainment: "culture",
  "pop-culture": "culture",
  "pop culture": "culture",
  music: "culture",
  science: "tech",
  technology: "tech",
  tech: "tech",
  ai: "tech",
  geopolitics: "geopolitics",
  world: "geopolitics",
  "global-politics": "geopolitics",
  china: "geopolitics",
  ukraine: "geopolitics",
  sports: "sports",
  nfl: "sports",
  nba: "sports",
  soccer: "sports",
  football: "sports",
  baseball: "sports",
  mma: "sports",
  boxing: "sports",
  "march-madness": "sports",
};
