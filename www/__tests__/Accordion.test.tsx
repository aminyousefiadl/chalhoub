import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Accordion } from "@/components";

test("can open accordion items to see the contents", () => {
  const { getByText } = render(<Accordion />);

  fireEvent.click(getByText("Color"));
  expect(getByText("Color")).toBeInTheDocument();

  fireEvent.click(getByText("Price"));
  expect(getByText("Price")).toBeInTheDocument();
});
