import type { ResolvedMarket } from "@/lib/types";
import {
  formatRelativeTime,
  formatAbsoluteTime,
  formatProbability,
  formatHoursBefore,
} from "@/lib/utils";
import MarketImage from "./MarketImage";

interface MarketCardProps {
  market: ResolvedMarket;
}

export default function MarketCard({ market }: MarketCardProps) {
  const {
    question,
    slug,
    image,
    closedTime,
    resolvedOutcome,
    predictionBeforeClose,
  } = market;

  const { wasCorrect, dataAvailable, probability, outcome, hoursBeforeClose } =
    predictionBeforeClose;

  const percentage = Math.round(probability * 100);

  return (
    <a
      href={`https://polymarket.com/event/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card block p-4 sm:p-5 group cursor-pointer"
    >
      {/* Row 1: Image + Question (the headline) */}
      <div className="flex gap-3 sm:gap-4 items-start">
        <MarketImage src={image} alt={question} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] sm:text-base font-medium text-poly-text leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {question}
          </h3>
          <time
            dateTime={closedTime}
            className="text-xs text-poly-text-tertiary mt-1 block"
            title={formatAbsoluteTime(closedTime)}
          >
            {formatRelativeTime(closedTime)}
          </time>
        </div>
      </div>

      {/* Row 2: Outcome + Prediction — the core info */}
      <div className="mt-3 pt-3 border-t border-white/[0.04]">
        <div className="flex items-center gap-3">
          {/* Outcome result */}
          <div className="flex items-center gap-2 shrink-0">
            {dataAvailable ? (
              wasCorrect ? (
                <div className="w-6 h-6 rounded-full bg-poly-green-dim border border-poly-green/25 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 6L5.5 8.5L9 3.5"
                      stroke="#00C853"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-poly-red-dim border border-poly-red/25 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3.5 3.5L8.5 8.5M8.5 3.5L3.5 8.5"
                      stroke="#FF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <span className="text-[10px] font-medium text-poly-text-tertiary">
                  ?
                </span>
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-sm font-medium text-poly-text">
                Resolved{" "}
                <span
                  className={
                    resolvedOutcome === "Yes"
                      ? "text-poly-green"
                      : resolvedOutcome === "No"
                      ? "text-poly-red"
                      : "text-poly-text"
                  }
                >
                  {resolvedOutcome}
                </span>
              </span>
            </div>
          </div>

          {/* Vertical separator */}
          <div className="w-px h-6 bg-white/[0.06] hidden sm:block" />

          {/* Pre-resolution probability */}
          <div className="flex-1 min-w-0">
            {dataAvailable ? (
              <div className="flex items-center gap-2.5">
                <span
                  className="text-lg font-semibold tabular-nums leading-none"
                  style={{
                    color:
                      percentage >= 80
                        ? "#00C853"
                        : percentage >= 60
                        ? "#2E5CFF"
                        : "#FF4444",
                  }}
                >
                  {formatProbability(probability)}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-poly-text-secondary truncate">
                    predicted{" "}
                    <span className="text-poly-text font-medium">
                      {outcome}
                    </span>
                  </span>
                  <span className="text-[11px] text-poly-text-tertiary">
                    {formatHoursBefore(hoursBeforeClose)}
                  </span>
                </div>
                {/* Mini progress bar */}
                <div className="hidden sm:block flex-1 max-w-[100px] h-1 rounded-full bg-white/[0.04] overflow-hidden ml-auto">
                  <div
                    className="progress-bar h-full rounded-full"
                    style={{
                      width: `${percentage}%`,
                      background:
                        percentage >= 80
                          ? "#00C853"
                          : percentage >= 60
                          ? "#2E5CFF"
                          : "#FF4444",
                    }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-xs text-poly-text-tertiary">
                No prediction data available
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
