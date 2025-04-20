import React from "react";
import { Button, Flex, Typography } from "antd";
import formatNumber from "utils/formatNumber";
import "./styles.css";
import { MinusSignSVG, PlusSVG } from "assets/jsx-svg";
const { Text } = Typography;

const CounterInput = ({
  value = 1,
  onChange = () => {},
  min = 0,
  max = Infinity,
  counterText = "",
  fullWidth = false,
  style = {},
  ...props
}) => {
  // Increment the value
  const increment = () => {
    if (value < max) {
      onChange(value + 1); // Trigger the onChange callback with the new value
    }
  };

  // Decrement the value
  const decrement = () => {
    if (value > min) {
      onChange(value - 1); // Trigger the onChange callback with the new value
    }
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      className="counter_input"
      style={fullWidth ? { width: "100%", ...style } : { ...style }}>
      {/* Decrement button in text mode */}
      <Button
        type="text"
        size="small"
        icon={<MinusSignSVG color="#667085" />}
        onClick={decrement}
        disabled={value <= min}
      />

      {/* Display the value and counterText */}
      <Text className="md_text_normal" style={{ color: "black" }}>
        {formatNumber(value)}
      </Text>

      {counterText && (
        <Text className="md_text_normal" style={{ color: "var(--gray-900)" }}>
          {counterText}
        </Text>
      )}
      {/* Increment button in text mode */}
      <Button
        type="text"
        icon={<PlusSVG fill="#667085" />}
        onClick={increment}
        size="small"
        disabled={value >= max}
      />
    </Flex>
  );
};

export default CounterInput;
