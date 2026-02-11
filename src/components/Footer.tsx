export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-poly-text-secondary">
          Data sourced from{" "}
          <a
            href="https://polymarket.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-poly-blue hover:underline"
          >
            Polymarket
          </a>
          . Not financial advice.
        </p>
        <p className="text-xs text-poly-text-tertiary">
          PolyNews {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
