import { Filter } from "@/components";
import { render, screen } from "@testing-library/react";

describe("Home Filter", () => {
  test("Renders filters title", () => {
    render(<Filter />);
    const headingElement = screen.getByText(/Filters/i);
    expect(headingElement).toBeInTheDocument();
  });
});
