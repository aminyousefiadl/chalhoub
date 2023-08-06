"use-client";
import React from "react";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <select
      id="select"
      className="bg-gray-100 min-w-[6rem] border max-w-xl border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4  "
      onChange={onChange}
      value={value}
      placeholder="Select"
    >
      {options.map((el: string) => (
        <option key={el} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
};
