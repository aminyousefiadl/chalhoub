"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Accordion } from "./Accordion";

const CloseIcon = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 14"
    className="w-6 h-6 text-gray-800  absolute left-4 top-4 cursor-pointer"
    onClick={() => setOpen(true)}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1h15M1 7h15M1 13h15"
    />
  </svg>
);

export const Filter = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CloseIcon setOpen={setOpen} />
      <div
        className={`md:transition-[transform] md:h-[100vh] duration-700 ease-in-out bg-white absolute md:sticky top-2 w-full h-full rounded-lg z-20 md:w-56 shadow-md ${
          open ? "translate-y-0" : "translate-y-full md:translate-y-0"
        }`}
      >
        <span
          onClick={() => setOpen(false)}
          className="cursor-pointer md:hidden m-4 text-white bg-black rounded-full w-6 h-6 flex items-center justify-center"
        >
          X
        </span>
        <h5 className="font-bold flex p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
          Filters
        </h5>
        <hr />
        <Accordion defaultExpanded="color" />
      </div>
    </>
  );
};
