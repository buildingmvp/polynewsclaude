interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong loading markets.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="glass-card p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-poly-red-dim border border-poly-red/20 flex items-center justify-center mx-auto mb-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-poly-red"
        >
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 6V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="14" r="0.75" fill="currentColor" />
        </svg>
      </div>
      <p className="text-poly-text-secondary text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="glass-pill glass-pill-active text-sm"
        >
          Try again
        </button>
      )}
    </div>
  );
}
