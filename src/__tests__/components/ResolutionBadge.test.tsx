import { render, screen } from "@testing-library/react";
import ResolutionBadge from "@/components/ResolutionBadge";

describe("ResolutionBadge", () => {
  it("renders correct badge when prediction was correct", () => {
    render(<ResolutionBadge wasCorrect={true} dataAvailable={true} />);
    expect(screen.getByText("Correct")).toBeInTheDocument();
  });

  it("renders incorrect badge when prediction was wrong", () => {
    render(<ResolutionBadge wasCorrect={false} dataAvailable={true} />);
    expect(screen.getByText("Incorrect")).toBeInTheDocument();
  });

  it("renders no data badge when data unavailable", () => {
    render(<ResolutionBadge wasCorrect={false} dataAvailable={false} />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });
});
