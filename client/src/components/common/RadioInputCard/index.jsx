import React from "react";
import { Radio } from "antd";
// style
import "./styles.css";

const RadioInputCard = ({
  title,
  description,
  disabled = false,
  isChecked = false,
  onChange = () => {},
  value,
  ...rest
}) => {
  const handleCardClick = () => {
    if (!disabled && !isChecked) {
      onChange(value); // Trigger the onChange handler with the selected value
    }
  };

  return (
    <div
      style={{ cursor: "pointer", marginBottom: "10px" }}
      className={`radio_input_card w-100 ${isChecked ? "checked" : "not_checked"} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleCardClick}>
      <Radio
        disabled={disabled}
        checked={isChecked}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}>
        <div style={{paddingInlineStart: "10px"}}>
          <p className="fz-14 fw-600">{title}</p>
          {description && <p className="fz-14">{description}</p>}
        </div>
      </Radio>
    </div>
  );
};

export default RadioInputCard;
