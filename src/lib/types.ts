// Raw response from Gamma Markets API
export interface GammaMarket {
  id: string;
  question: string;
  slug: string;
  image: string;
  outcomes: string; // JSON string: '["Yes","No"]'
  outcomePrices: string; // JSON string: '["1","0"]' for resolved
  endDate: string;
  closed: boolean;
  closedTime: string;
  active: boolean;
  conditionId: string;
  category: string;
  volume: string;
  clobTokenIds: string; // JSON string: '["tokenId1","tokenId2"]'
  description?: string;
  tags?: Array<{ id: string; slug: string; label: string }>;
}

// Raw response from CLOB prices-history
export interface PriceHistoryPoint {
  t: number; // Unix timestamp
  p: string; // Price as string, e.g. "0.52"
}

export interface PriceHistoryResponse {
  history: PriceHistoryPoint[];
}

// Processed/normalized market for the UI
export interface ResolvedMarket {
  id: string;
  question: string;
  slug: string;
  image: string | null;
  outcomes: string[];
  resolvedOutcome: string;
  resolvedOutcomeIndex: number;
  closedTime: string; // ISO timestamp
  category: MarketCategory;
  volume: number;
  predictionBeforeClose: {
    outcome: string;
    probability: number;
    wasCorrect: boolean;
    dataAvailable: boolean;
    hoursBeforeClose: number;
  };
}

export type MarketCategory =
  | "politics"
  | "economics"
  | "culture"
  | "tech"
  | "geopolitics"
  | "sports"
  | "other";

// API response from our Next.js API routes
export interface MarketsApiResponse {
  markets: ResolvedMarket[];
  nextOffset: number | null;
  total: number;
}
