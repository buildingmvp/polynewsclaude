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

// Keyword-to-category mapping. normalizeCategory does substring matching
// against these keys, so "politic" matches "politics", "us-politics", etc.
export const CATEGORY_KEYWORDS: Array<{
  keyword: string;
  category: MarketCategory;
}> = [
  // Politics
  { keyword: "politic", category: "politics" },
  { keyword: "election", category: "politics" },
  { keyword: "trump", category: "politics" },
  { keyword: "biden", category: "politics" },
  { keyword: "democrat", category: "politics" },
  { keyword: "republican", category: "politics" },
  { keyword: "senate", category: "politics" },
  { keyword: "congress", category: "politics" },
  { keyword: "governor", category: "politics" },
  { keyword: "president", category: "politics" },
  { keyword: "gop", category: "politics" },
  { keyword: "white-house", category: "politics" },
  { keyword: "cabinet", category: "politics" },
  { keyword: "impeach", category: "politics" },

  // Economics
  { keyword: "econom", category: "economics" },
  { keyword: "financ", category: "economics" },
  { keyword: "crypto", category: "economics" },
  { keyword: "bitcoin", category: "economics" },
  { keyword: "ethereum", category: "economics" },
  { keyword: "business", category: "economics" },
  { keyword: "inflation", category: "economics" },
  { keyword: "gdp", category: "economics" },
  { keyword: "recession", category: "economics" },
  { keyword: "stock", category: "economics" },
  { keyword: "tariff", category: "economics" },
  { keyword: "banking", category: "economics" },
  { keyword: "currency", category: "economics" },

  // Culture
  { keyword: "culture", category: "culture" },
  { keyword: "entertain", category: "culture" },
  { keyword: "music", category: "culture" },
  { keyword: "movie", category: "culture" },
  { keyword: "film", category: "culture" },
  { keyword: "celebrity", category: "culture" },
  { keyword: "oscar", category: "culture" },
  { keyword: "grammy", category: "culture" },
  { keyword: "award", category: "culture" },
  { keyword: "tiktok", category: "culture" },

  // Tech
  { keyword: "tech", category: "tech" },
  { keyword: "science", category: "tech" },
  { keyword: "openai", category: "tech" },
  { keyword: "google", category: "tech" },
  { keyword: "apple", category: "tech" },
  { keyword: "microsoft", category: "tech" },
  { keyword: "spacex", category: "tech" },
  { keyword: "nasa", category: "tech" },
  { keyword: "space", category: "tech" },
  { keyword: "quantum", category: "tech" },
  { keyword: "robot", category: "tech" },
  { keyword: "cyber", category: "tech" },
  { keyword: "software", category: "tech" },
  { keyword: "chatgpt", category: "tech" },
  { keyword: "gpt-", category: "tech" },
  { keyword: "gemini", category: "tech" },
  { keyword: "artificial intelligence", category: "tech" },

  // Geopolitics
  { keyword: "geopolitic", category: "geopolitics" },
  { keyword: "world", category: "geopolitics" },
  { keyword: "global", category: "geopolitics" },
  { keyword: "china", category: "geopolitics" },
  { keyword: "ukraine", category: "geopolitics" },
  { keyword: "russia", category: "geopolitics" },
  { keyword: "nato", category: "geopolitics" },
  { keyword: "war", category: "geopolitics" },
  { keyword: "military", category: "geopolitics" },
  { keyword: "iran", category: "geopolitics" },
  { keyword: "israel", category: "geopolitics" },
  { keyword: "gaza", category: "geopolitics" },
  { keyword: "taiwan", category: "geopolitics" },
  { keyword: "korea", category: "geopolitics" },
  { keyword: "europe", category: "geopolitics" },
  { keyword: "middle-east", category: "geopolitics" },
  { keyword: "sanction", category: "geopolitics" },
  { keyword: "conflict", category: "geopolitics" },
  { keyword: "diplomacy", category: "geopolitics" },

  // Sports
  { keyword: "sport", category: "sports" },
  { keyword: "nfl", category: "sports" },
  { keyword: "nba", category: "sports" },
  { keyword: "mlb", category: "sports" },
  { keyword: "nhl", category: "sports" },
  { keyword: "soccer", category: "sports" },
  { keyword: "football", category: "sports" },
  { keyword: "baseball", category: "sports" },
  { keyword: "basketball", category: "sports" },
  { keyword: "hockey", category: "sports" },
  { keyword: "tennis", category: "sports" },
  { keyword: "golf", category: "sports" },
  { keyword: "mma", category: "sports" },
  { keyword: "ufc", category: "sports" },
  { keyword: "boxing", category: "sports" },
  { keyword: "super-bowl", category: "sports" },
  { keyword: "superbowl", category: "sports" },
  { keyword: "olympics", category: "sports" },
  { keyword: "march-madness", category: "sports" },
  { keyword: "f1", category: "sports" },
  { keyword: "cricket", category: "sports" },
  { keyword: "rugby", category: "sports" },
  { keyword: "esport", category: "sports" },
];
