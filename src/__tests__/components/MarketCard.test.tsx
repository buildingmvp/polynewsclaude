import { render, screen } from "@testing-library/react";
import MarketCard from "@/components/MarketCard";
import {
  mockResolvedMarket,
  mockIncorrectMarket,
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

  it("renders the resolved outcome", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    // "Yes" appears twice: as resolved outcome and as prediction outcome
    const yesElements = screen.getAllByText("Yes");
    expect(yesElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders correct badge for correct prediction", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(screen.getByText("Correct")).toBeInTheDocument();
  });

  it("renders incorrect badge for wrong prediction", () => {
    render(<MarketCard market={mockIncorrectMarket} />);
    expect(screen.getByText("Incorrect")).toBeInTheDocument();
  });

  it("renders no data badge when prediction data unavailable", () => {
    render(<MarketCard market={mockNoDataMarket} />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renders probability percentage for available data", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(screen.getByText("73%")).toBeInTheDocument();
  });

  it("renders category pill", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(screen.getByText("Economics")).toBeInTheDocument();
  });

  it("renders volume", () => {
    render(<MarketCard market={mockResolvedMarket} />);
    expect(screen.getByText("$5.0M volume")).toBeInTheDocument();
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
