"use client";

import React, { useState, useMemo, useCallback } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { useConfig } from "@/context/information.context";
import { ColorsList } from "@/constants/Colors";

enum FiltersTitle {
  Color = "Color",
  Price = "Price",
}

export const Accordion = ({
  defaultExpanded,
}: {
  defaultExpanded?: "price" | "color";
}) => {
  const [isColorExpanded, setColorExpanded] = useState(
    defaultExpanded === "color"
  );
  const [isPriceExpanded, setPriceExpanded] = useState(
    defaultExpanded === "price"
  );

  const {
    setInformation,
    information: { color, priceRange },
  } = useConfig();

  const handleExpandClick = useCallback((el: FiltersTitle) => {
    if (el === FiltersTitle.Color) setColorExpanded((prev) => !prev);
    else if (el === FiltersTitle.Price) setPriceExpanded((prev) => !prev);
  }, []);

  const colorContent = useMemo(
    () => (
      <div className="py-9">
        {color && (
          <span
            className="cursor-pointer mx-2 text-primary text-sm"
            onClick={() => setInformation({ color: "" })}
          >
            Clear
          </span>
        )}
        <div className="flex flex-wrap">
          {ColorsList.map((el) => (
            <span
              key={el}
              onClick={() => setInformation({ color: el })}
              className={`cursor-pointer w-6 flex m-2 h-6 shadow-lg rounded-sm ${
                color === el ? "border-2 border-blue-500" : ""
              }`}
              style={{ backgroundColor: el.toLocaleLowerCase() }}
            />
          ))}
        </div>
      </div>
    ),
    [color, setInformation]
  );

  const priceContent = useMemo(
    () => (
      <div className="p-3 border border-b-0 border-gray-200  py-9">
        <p className="text-sm mb-2 text-primary">
          <span className="mr-2 text-gray-400 text-xs">From</span>$
          {priceRange[0].toLocaleString()}
          <span className="mx-2 text-gray-400 text-xs">To</span>$
          {priceRange[1].toLocaleString()}
        </p>
        <Slider
          range
          min={0}
          max={20000}
          value={priceRange}
          onChange={(e) => setInformation({ priceRange: e as number[] })}
        />
      </div>
    ),
    [priceRange, setInformation]
  );

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {Object.values(FiltersTitle).map((el: FiltersTitle) => (
        <React.Fragment key={el}>
          <h2 id="accordion-collapse-heading-1">
            <button
              name={`expandable-div-${el}`}
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500  border-b border-gray-200    hover:bg-gray-100 "
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded={
                el === FiltersTitle.Color ? isColorExpanded : isPriceExpanded
              }
              aria-controls="accordion-collapse-body-1"
              onClick={() => handleExpandClick(el)}
            >
              <span>{el}</span>

              <svg
                data-accordion-icon
                className={`w-3 h-3 transition-[transform] duration-500 ease-in ${
                  el === FiltersTitle.Color
                    ? isColorExpanded
                      ? ""
                      : "rotate-180"
                    : isPriceExpanded
                    ? ""
                    : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className={`${
              el === FiltersTitle.Color
                ? isColorExpanded
                  ? "max-h-60"
                  : "max-h-0"
                : isPriceExpanded
                ? "max-h-60"
                : "max-h-0"
            } transition-[max-height] duration-500 ease-in  overflow-hidden `}
            aria-labelledby="accordion-collapse-heading-1"
          >
            {el === FiltersTitle.Color ? colorContent : priceContent}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
