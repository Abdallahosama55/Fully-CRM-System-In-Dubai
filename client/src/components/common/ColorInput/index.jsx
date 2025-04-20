import { ColorPicker, Input } from "antd";
import React from "react";
// style
import "./styles.css";

const ColorInput = ({ value = "", onChange, className, ...props }) => {
  // Ensure the color picker updates the hex input correctly
  console.log("props", props);
  const handlePickerChange = (color) => {
    const hex = color.toHexString(); // Ensure # is included
    onChange(hex);
  };

  // Handle the input change logic with validation
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Allow only valid hex characters and limit to 6 characters
    if (/^[0-9a-fA-F]*$/.test(inputValue) && inputValue.length <= 8) {
      onChange("#" + inputValue);
    }
  };

  return (
    <Input
      prefix="#"
      value={value?.replace("#", "")}
      onChange={handleInputChange}
      placeholder="Enter hex code"
      maxLength={8}
      {...props}
      className={`hex_color_input ${className ? className : ""}`}
      addonAfter={<ColorPicker size="small" value={value} onChange={handlePickerChange} />}
    />
  );
};

export default ColorInput;
