import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Dropdown } from "@/components";

describe("Dropdown", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const value = "Option 2";
  const handleChange = jest.fn();

  it("renders the select element with the provided options", () => {
    const { getByPlaceholderText } = render(
      <Dropdown options={options} value={value} onChange={handleChange} />
    );

    const selectElement = getByPlaceholderText("Select");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.tagName).toBe("SELECT");

    // Check if the options are rendered correctly
    const optionElements = selectElement.querySelectorAll("option");
    expect(optionElements.length).toBe(options.length);

    // Check if each option has the correct value and label
    options.forEach((option, index) => {
      expect(optionElements[index].value).toBe(option);
      expect(optionElements[index].textContent).toBe(option);
    });
  });

  it("calls the onChange event handler when an option is selected", () => {
    const { getByPlaceholderText } = render(
      <Dropdown options={options} value={value} onChange={handleChange} />
    );

    const selectElement = getByPlaceholderText("Select");

    // Simulate selecting a different option
    const newValue = "Option 2";
    fireEvent.change(selectElement, { target: { value: newValue } });

    // The handleChange function should have been called with the new value
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); // You can check for more specific event object details if needed
    expect(handleChange.mock.calls[0][0].target.value).toBe(newValue);
  });
});
