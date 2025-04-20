import Box from "components/Box";
import React from "react";
const getProps = (type) => {
  switch (type) {
    case "high":
      return {
        background: "#E41E2D",
        color: "white",
        label: "HIGH",
        icon: "︽",
        iconSx: {
          position: "relative",
          bottom: "2px",
        },
      };
    case "medium":
      return {
        color: "white",
        background: "#981DA9",
        label: "MEDIUM",
        icon: "○",
        iconSx: {},
      };
    case "low":
      return {
        color: "white",
        background: "#2D5FEB",
        label: "LOW",
        icon: "︾",
        iconSx: {
          position: "relative",
          top: "5px",
        },
      };
  }
};
const PriorityLabel = ({ type = "high" }) => {
  const { label, icon, iconSx, ...propsStyle } = getProps(type);
  return (
    <Box
      sx={{
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        ...propsStyle,
      }}>
      <span
        style={{
          fontSize: "14px",
          lineHeight: "0",
          position: "relative",
          letterSpacing: "4px",
          ...iconSx,
        }}>
        {icon}
      </span>
      {label}
    </Box>
  );
};
export default PriorityLabel;
