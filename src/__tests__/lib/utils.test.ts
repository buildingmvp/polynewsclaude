import {
  formatProbability,
  safeJsonParse,
  normalizeCategory,
  determineResolutionIndex,
  findClosestPricePoint,
  formatHoursBefore,
  formatVolume,
} from "@/lib/utils";
import type { PriceHistoryPoint } from "@/lib/types";

describe("formatProbability", () => {
  it("converts 0.73 to 73%", () => {
    expect(formatProbability(0.73)).toBe("73%");
  });

  it("converts 0 to 0%", () => {
    expect(formatProbability(0)).toBe("0%");
  });

  it("converts 1 to 100%", () => {
    expect(formatProbability(1)).toBe("100%");
  });

  it("rounds 0.556 to 56%", () => {
    expect(formatProbability(0.556)).toBe("56%");
  });
});

describe("safeJsonParse", () => {
  it("parses valid JSON", () => {
    expect(safeJsonParse('["Yes","No"]', [])).toEqual(["Yes", "No"]);
  });

  it("returns fallback for invalid JSON", () => {
    expect(safeJsonParse("invalid", ["default"])).toEqual(["default"]);
  });

  it("returns fallback for empty string", () => {
    expect(safeJsonParse("", [])).toEqual([]);
  });
});

describe("normalizeCategory", () => {
  it("maps us-politics to politics", () => {
    expect(normalizeCategory("us-politics")).toBe("politics");
  });

  it("maps crypto to economics", () => {
    expect(normalizeCategory("crypto")).toBe("economics");
  });

  it("maps ai to tech", () => {
    expect(normalizeCategory("ai")).toBe("tech");
  });

  it("maps sports to sports", () => {
    expect(normalizeCategory("sports")).toBe("sports");
  });

  it("maps unknown to other", () => {
    expect(normalizeCategory("random-thing")).toBe("other");
  });

  it("maps from tags when category is unknown", () => {
    expect(
      normalizeCategory("unknown", [{ slug: "nba" }])
    ).toBe("sports");
  });

  it("handles null/undefined category", () => {
    expect(normalizeCategory("")).toBe("other");
  });
});

describe("determineResolutionIndex", () => {
  it("returns index of outcome with price near 1.0", () => {
    expect(determineResolutionIndex(["1", "0"])).toBe(0);
  });

  it("returns second index when No wins", () => {
    expect(determineResolutionIndex(["0", "1"])).toBe(1);
  });

  it("handles floating point prices", () => {
    expect(determineResolutionIndex(["0.99", "0.01"])).toBe(0);
  });

  it("handles multi-outcome markets", () => {
    expect(determineResolutionIndex(["0.01", "0.02", "0.97"])).toBe(2);
  });

  it("falls back to highest price if none > 0.95", () => {
    expect(determineResolutionIndex(["0.3", "0.7"])).toBe(1);
  });
});

describe("findClosestPricePoint", () => {
  const history: PriceHistoryPoint[] = [
    { t: 1000, p: "0.50" },
    { t: 2000, p: "0.60" },
    { t: 3000, p: "0.70" },
    { t: 4000, p: "0.80" },
  ];

  it("finds the closest point before target", () => {
    const result = findClosestPricePoint(history, 3500);
    expect(result?.point.t).toBe(3000);
    expect(result?.point.p).toBe("0.70");
  });

  it("returns exact match", () => {
    const result = findClosestPricePoint(history, 2000);
    expect(result?.point.t).toBe(2000);
  });

  it("returns null for empty history", () => {
    expect(findClosestPricePoint([], 1000)).toBeNull();
  });

  it("calculates correct hours before", () => {
    const result = findClosestPricePoint(history, 4000);
    expect(result?.hoursBefore).toBe(0);
  });

  it("falls back to closest overall if all points after target", () => {
    const result = findClosestPricePoint(history, 500);
    expect(result?.point.t).toBe(1000);
  });
});

describe("formatHoursBefore", () => {
  it("formats <1h correctly", () => {
    expect(formatHoursBefore(0.5)).toBe("<1h before");
  });

  it("formats ~3h correctly", () => {
    expect(formatHoursBefore(3)).toBe("~3h before");
  });

  it("formats 12h correctly", () => {
    expect(formatHoursBefore(12)).toBe("12h before");
  });

  it("formats ~20h correctly", () => {
    expect(formatHoursBefore(20)).toBe("~20h before");
  });

  it("formats days correctly", () => {
    expect(formatHoursBefore(48)).toBe("~2d before");
  });
});

describe("formatVolume", () => {
  it("formats millions", () => {
    expect(formatVolume(5000000)).toBe("$5.0M");
  });

  it("formats thousands", () => {
    expect(formatVolume(5000)).toBe("$5.0K");
  });

  it("formats small numbers", () => {
    expect(formatVolume(500)).toBe("$500");
  });
});
