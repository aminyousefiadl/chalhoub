/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render } from "@testing-library/react";
import { Banner } from "@/components";
import { ImageProps } from "next/image";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return (
      <img
        src={props.src as string}
        alt={props.alt}
        className={props.className}
      />
    );
  },
}));

describe("Banner", () => {
  it("renders the banner section", () => {
    const { container } = render(<Banner />);
    const sectionElement = container.querySelector("section");
    expect(sectionElement).toBeInTheDocument();
  });

  it("displays the image with the correct attributes", () => {
    const { getByAltText } = render(<Banner />);
    const imageElement = getByAltText("Promotion Banner");

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/banner_promotion.webp");
    expect(imageElement).toHaveAttribute("alt", "Promotion Banner");
    expect(imageElement).toHaveClass("rounded-lg");
  });
});
