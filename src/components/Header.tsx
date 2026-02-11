export default function Header() {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-poly-blue flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1L14.5 4.75V11.25L8 15L1.5 11.25V4.75L8 1Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="8" cy="8" r="2.5" fill="white" />
            </svg>
          </div>
          <h1 className="text-base font-semibold tracking-tight text-poly-text">
            PolyNews
          </h1>
        </div>
        <a
          href="https://polymarket.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-poly-text-tertiary hover:text-poly-text-secondary transition-colors"
        >
          polymarket.com
        </a>
      </div>
    </header>
  );
}
