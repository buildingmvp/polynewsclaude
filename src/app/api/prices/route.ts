import { NextRequest, NextResponse } from "next/server";
import { CLOB_API_BASE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get("tokenId");
    const closedTime = searchParams.get("closedTime");

    if (!tokenId) {
      return NextResponse.json(
        { error: "tokenId parameter is required" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({ market: tokenId });

    if (closedTime) {
      const closedTimestamp = Math.floor(
        new Date(closedTime).getTime() / 1000
      );
      params.set("startTs", String(closedTimestamp - 7200));
      params.set("endTs", String(closedTimestamp));
      params.set("fidelity", "60");
    } else {
      params.set("interval", "1d");
      params.set("fidelity", "60");
    }

    const url = `${CLOB_API_BASE}/prices-history?${params}`;
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`CLOB API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      },
    });
  } catch (error) {
    console.error("Prices API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch price history" },
      { status: 503 }
    );
  }
}
