export default function LoadingCard() {
  return (
    <div className="glass-card p-4 sm:p-5 animate-pulse">
      <div className="flex gap-4">
        {/* Image skeleton */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/[0.06] shrink-0" />

        {/* Content skeleton */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 bg-white/[0.06] rounded-md w-full" />
            <div className="h-4 bg-white/[0.06] rounded-md w-3/4" />
          </div>

          {/* Meta line */}
          <div className="flex gap-2 items-center">
            <div className="h-3 bg-white/[0.06] rounded w-24" />
            <div className="h-5 bg-white/[0.06] rounded-full w-16" />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <div className="h-6 bg-white/[0.06] rounded-full w-20" />
        <div className="flex-1 ml-4 space-y-1.5">
          <div className="h-3 bg-white/[0.06] rounded w-32" />
          <div className="h-1.5 bg-white/[0.06] rounded-full w-full" />
        </div>
      </div>
    </div>
  );
}
