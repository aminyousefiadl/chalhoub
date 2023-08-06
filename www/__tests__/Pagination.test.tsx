import { Pagination } from "@/components";
import { render } from "@testing-library/react";

const setup = () => ({
  ...render(<Pagination />),
});

describe("Acceptable Pagination", () => {
  it("renders to match snapshot", () => {
    const { baseElement } = setup();
    expect(baseElement).toMatchSnapshot();
  });
});
