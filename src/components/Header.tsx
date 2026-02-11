export default function Header() {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="w-8 h-8 rounded-lg bg-poly-blue flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L16.5 5.5V12.5L9 17L1.5 12.5V5.5L9 1Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="9" cy="9" r="3" fill="white" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-poly-text">
              PolyNews
            </h1>
            <p className="text-xs text-poly-text-secondary leading-tight hidden sm:block">
              What prediction markets got right
            </p>
          </div>
        </div>
        <a
          href="https://polymarket.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-poly-text-secondary hover:text-poly-text transition-colors"
        >
          Powered by Polymarket
        </a>
      </div>
    </header>
  );
}
