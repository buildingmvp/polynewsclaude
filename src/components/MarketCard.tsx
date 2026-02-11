import type { ResolvedMarket } from "@/lib/types";
import { formatRelativeTime, formatAbsoluteTime, formatVolume } from "@/lib/utils";
import MarketImage from "./MarketImage";
import ResolutionBadge from "./ResolutionBadge";
import ProbabilityDisplay from "./ProbabilityDisplay";

interface MarketCardProps {
  market: ResolvedMarket;
}

const CATEGORY_LABELS: Record<string, string> = {
  politics: "Politics",
  economics: "Economics",
  culture: "Culture",
  tech: "Tech",
  geopolitics: "Geopolitics",
  sports: "Sports",
  other: "Other",
};

export default function MarketCard({ market }: MarketCardProps) {
  const {
    question,
    slug,
    image,
    closedTime,
    category,
    volume,
    resolvedOutcome,
    predictionBeforeClose,
  } = market;

  return (
    <a
      href={`https://polymarket.com/event/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card block p-4 sm:p-5 group cursor-pointer"
    >
      {/* Top section: Image + Question + Meta */}
      <div className="flex gap-3 sm:gap-4">
        <MarketImage src={image} alt={question} />

        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-medium text-poly-text leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {question}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <time
              dateTime={closedTime}
              className="text-xs text-poly-text-secondary"
              title={formatAbsoluteTime(closedTime)}
            >
              {formatRelativeTime(closedTime)}
            </time>

            <span className="text-poly-text-tertiary text-xs">·</span>

            <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-poly-text-secondary">
              {CATEGORY_LABELS[category] || "Other"}
            </span>

            {volume > 0 && (
              <>
                <span className="text-poly-text-tertiary text-xs hidden sm:inline">·</span>
                <span className="text-xs text-poly-text-tertiary hidden sm:inline">
                  {formatVolume(volume)} volume
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom section: Resolution badge + Prediction probability */}
      <div className="mt-3 pt-3 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <ResolutionBadge
            wasCorrect={predictionBeforeClose.wasCorrect}
            dataAvailable={predictionBeforeClose.dataAvailable}
          />
          <span className="text-xs text-poly-text-secondary">
            Resolved{" "}
            <span className="font-medium text-poly-text">
              {resolvedOutcome}
            </span>
          </span>
        </div>

        <div className="flex-1 sm:border-l sm:border-white/[0.04] sm:pl-3">
          <ProbabilityDisplay
            probability={predictionBeforeClose.probability}
            outcome={predictionBeforeClose.outcome}
            dataAvailable={predictionBeforeClose.dataAvailable}
            hoursBeforeClose={predictionBeforeClose.hoursBeforeClose}
          />
        </div>
      </div>
    </a>
  );
}
