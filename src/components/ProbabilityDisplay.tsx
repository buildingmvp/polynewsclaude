import { formatProbability, formatHoursBefore } from "@/lib/utils";

interface ProbabilityDisplayProps {
  probability: number;
  outcome: string;
  dataAvailable: boolean;
  hoursBeforeClose: number;
}

export default function ProbabilityDisplay({
  probability,
  outcome,
  dataAvailable,
  hoursBeforeClose,
}: ProbabilityDisplayProps) {
  if (!dataAvailable) {
    return (
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-poly-text-tertiary">
          Prediction data unavailable
        </p>
        <div className="h-1.5 rounded-full bg-white/[0.06] w-full" />
      </div>
    );
  }

  const percentage = Math.round(probability * 100);
  const isHighConfidence = percentage >= 80;
  const isMedConfidence = percentage >= 60;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm text-poly-text">
          <span className="font-semibold text-base tabular-nums">
            {formatProbability(probability)}
          </span>{" "}
          <span className="text-poly-text-secondary">{outcome}</span>
        </p>
        <span className="text-xs text-poly-text-tertiary whitespace-nowrap">
          {formatHoursBefore(hoursBeforeClose)}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] w-full overflow-hidden">
        <div
          className="progress-bar h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: isHighConfidence
              ? "linear-gradient(90deg, #22C55E, #4ADE80)"
              : isMedConfidence
              ? "linear-gradient(90deg, #2A6CED, #60A5FA)"
              : "linear-gradient(90deg, #EF4444, #F87171)",
          }}
        />
      </div>
    </div>
  );
}
