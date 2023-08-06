import { Sort } from "@/components";
import { render } from "@testing-library/react";

const setup = () => ({
  ...render(<Sort />),
});

describe("Acceptable Sort Component", () => {
  it("renders to match snapshot", () => {
    const { baseElement } = setup();
    expect(baseElement).toMatchSnapshot();
  });
});
