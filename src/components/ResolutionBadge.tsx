import clsx from "clsx";

interface ResolutionBadgeProps {
  wasCorrect: boolean;
  dataAvailable: boolean;
}

export default function ResolutionBadge({
  wasCorrect,
  dataAvailable,
}: ResolutionBadgeProps) {
  if (!dataAvailable) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-poly-text-tertiary"
        >
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
          <text
            x="7"
            y="10"
            textAnchor="middle"
            fill="currentColor"
            fontSize="8"
            fontWeight="600"
          >
            ?
          </text>
        </svg>
        <span className="text-xs font-medium text-poly-text-tertiary">
          No data
        </span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border",
        wasCorrect
          ? "bg-poly-green-dim border-poly-green/20 text-poly-green"
          : "bg-poly-red-dim border-poly-red/20 text-poly-red"
      )}
    >
      {wasCorrect ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0"
        >
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4.5 7L6.5 9L9.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0"
        >
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 5L9 9M9 5L5 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className="text-xs font-medium">
        {wasCorrect ? "Correct" : "Incorrect"}
      </span>
    </div>
  );
}
