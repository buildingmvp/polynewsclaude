export default function LoadingCard() {
  return (
    <div className="glass-card p-4 sm:p-5 animate-pulse">
      {/* Row 1: Image + Question */}
      <div className="flex gap-3 sm:gap-4 items-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/[0.04] shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-white/[0.04] rounded-md w-full" />
          <div className="h-4 bg-white/[0.04] rounded-md w-3/4" />
          <div className="h-3 bg-white/[0.04] rounded w-20 mt-1" />
        </div>
      </div>

      {/* Row 2: Outcome + Prediction */}
      <div className="mt-3 pt-3 border-t border-white/[0.03] flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-white/[0.04]" />
        <div className="h-3.5 bg-white/[0.04] rounded w-24" />
        <div className="w-px h-6 bg-white/[0.03] hidden sm:block" />
        <div className="h-5 bg-white/[0.04] rounded w-12" />
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-white/[0.04] rounded w-28" />
          <div className="h-1 bg-white/[0.04] rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}
