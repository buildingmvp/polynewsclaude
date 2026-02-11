import { render, screen } from "@testing-library/react";
import MarketCard from "@/components/MarketCard";
import {
  mockResolvedMarket,
  mockNoDataMarket,
} from "../fixtures/mockData";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, ...rest } = props;
    return <img data-fill={fill ? "true" : undefined} {...rest} />;
  },
}));

describe("MarketCard", () => {
  it("renders the market question", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(
      screen.getByText("Will Bitcoin reach $100,000 by end of 2025?")
    ).toBeInTheDocument();
  });

  it("renders the resolved outcome text", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    // "Yes" appears in both resolved outcome and prediction outcome
    const yesElements = screen.getAllByText("Yes");
    expect(yesElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'Resolved' label", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(screen.getByText(/Resolved/)).toBeInTheDocument();
  });

  it("renders probability percentage for available data", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(screen.getByText("73%")).toBeInTheDocument();
  });

  it("renders predicted outcome text", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(screen.getByText(/predicted/)).toBeInTheDocument();
  });

  it("renders 'No prediction data' for unavailable data", () => {
    render(<MarketCard market={mockNoDataMarket} />);
    expect(
      screen.getByText("No prediction data available")
    ).toBeInTheDocument();
  });

  it("links to polymarket", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://polymarket.com/event/will-bitcoin-reach-100k"
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
