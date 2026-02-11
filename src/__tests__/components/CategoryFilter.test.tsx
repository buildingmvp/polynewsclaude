import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "@/components/CategoryFilter";

describe("CategoryFilter", () => {
  const mockOnCategoryChange = jest.fn();

  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  it("renders all category pills", () => {
    render(
      <CategoryFilter
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Politics")).toBeInTheDocument();
    expect(screen.getByText("Economics")).toBeInTheDocument();
    expect(screen.getByText("Culture")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Geopolitics")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("calls onCategoryChange when a pill is clicked", () => {
    render(
      <CategoryFilter
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    fireEvent.click(screen.getByText("Politics"));
    expect(mockOnCategoryChange).toHaveBeenCalledWith("politics");
  });

  it("highlights the active category", () => {
    render(
      <CategoryFilter
        selectedCategory="politics"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const politicsButton = screen.getByText("Politics");
    expect(politicsButton.className).toContain("glass-pill-active");

    const allButton = screen.getByText("All");
    expect(allButton.className).not.toContain("glass-pill-active");
  });
});
