import { NextRequest, NextResponse } from "next/server";
import { getResolvedMarkets } from "@/lib/polymarket";
import { MARKETS_PER_PAGE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? String(MARKETS_PER_PAGE), 10),
      100
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10);
    const category = searchParams.get("category") ?? undefined;

    const data = await getResolvedMarkets(limit, offset, category);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Markets API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch markets",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
