import type { ResolvedMarket, GammaMarket, PriceHistoryPoint } from "@/lib/types";

export const mockResolvedMarket: ResolvedMarket = {
  id: "test-market-1",
  question: "Will Bitcoin reach $100,000 by end of 2025?",
  slug: "will-bitcoin-reach-100k",
  image: "https://polymarket-upload.s3.us-east-2.amazonaws.com/test.png",
  outcomes: ["Yes", "No"],
  resolvedOutcome: "Yes",
  resolvedOutcomeIndex: 0,
  closedTime: "2025-12-31T23:59:59Z",
  category: "economics",
  volume: 5000000,
  predictionBeforeClose: {
    outcome: "Yes",
    probability: 0.73,
    wasCorrect: true,
    dataAvailable: true,
    hoursBeforeClose: 1.2,
  },
};

export const mockIncorrectMarket: ResolvedMarket = {
  id: "test-market-2",
  question: "Will there be a US government shutdown in January 2026?",
  slug: "us-government-shutdown-jan-2026",
  image: null,
  outcomes: ["Yes", "No"],
  resolvedOutcome: "No",
  resolvedOutcomeIndex: 1,
  closedTime: "2026-01-31T23:59:59Z",
  category: "politics",
  volume: 2000000,
  predictionBeforeClose: {
    outcome: "Yes",
    probability: 0.65,
    wasCorrect: false,
    dataAvailable: true,
    hoursBeforeClose: 0.9,
  },
};

export const mockNoDataMarket: ResolvedMarket = {
  id: "test-market-3",
  question: "Will AI pass the Turing test by 2026?",
  slug: "ai-turing-test-2026",
  image: "https://polymarket-upload.s3.us-east-2.amazonaws.com/ai.png",
  outcomes: ["Yes", "No"],
  resolvedOutcome: "No",
  resolvedOutcomeIndex: 1,
  closedTime: "2026-01-15T12:00:00Z",
  category: "tech",
  volume: 1000000,
  predictionBeforeClose: {
    outcome: "Unknown",
    probability: 0,
    wasCorrect: false,
    dataAvailable: false,
    hoursBeforeClose: 0,
  },
};

export const mockGammaMarket: GammaMarket = {
  id: "gamma-1",
  question: "Will Bitcoin reach $100,000?",
  slug: "bitcoin-100k",
  image: "https://polymarket-upload.s3.us-east-2.amazonaws.com/btc.png",
  outcomes: '["Yes","No"]',
  outcomePrices: '["1","0"]',
  endDate: "2025-12-31T23:59:59Z",
  closed: true,
  closedTime: "2025-12-31T23:59:59Z",
  active: false,
  conditionId: "0x123",
  category: "crypto",
  volume: "5000000",
  clobTokenIds: '["token1","token2"]',
};

export const mockPriceHistory: PriceHistoryPoint[] = [
  { t: 1735689599 - 7200, p: "0.68" },
  { t: 1735689599 - 3600, p: "0.73" },
  { t: 1735689599 - 1800, p: "0.78" },
  { t: 1735689599 - 600, p: "0.85" },
];

export const mockMarketsList: ResolvedMarket[] = [
  mockResolvedMarket,
  mockIncorrectMarket,
  mockNoDataMarket,
];
