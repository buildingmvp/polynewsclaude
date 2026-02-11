# PolyNews

A glassmorphism-styled news feed that shows recently resolved Polymarket prediction markets. See what the markets predicted, whether they were right, and browse by category.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/buildingmvp/polynewsclaude)

Or manually:

```bash
npm i -g vercel
vercel
```

No environment variables are required — the Polymarket APIs are public.

## Features

- **Resolved Markets Feed** — Browse markets that have just resolved, sorted newest-first
- **Prediction Accuracy** — See if the market's prediction (1hr before close) matched the actual outcome
- **Category Filtering** — Filter by Politics, Economics, Culture, Tech, Geopolitics, Sports, or Other
- **Infinite Scroll** — Seamlessly loads more markets as you scroll
- **Glassmorphism Design** — Frosted glass cards with Polymarket's color palette

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 with CSS-first configuration
- **Data Fetching**: SWR Infinite (client), server-side fetch with caching
- **APIs**: Polymarket Gamma API + CLOB API (no auth required)
- **Testing**: Jest + React Testing Library (46 tests)

## Architecture

```
src/
  app/              # Next.js App Router pages and API routes
    api/markets/    # Proxy to Polymarket Gamma + CLOB APIs
    api/prices/     # Price history proxy (for future use)
  components/       # React components (glass cards, badges, feed)
  hooks/            # SWR hooks, intersection observer
  lib/              # Types, constants, utilities, API client
  __tests__/        # Test suite
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |
