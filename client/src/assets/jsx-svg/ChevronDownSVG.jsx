import React from "react";

const ChevronDownSVG = ({ width = 16, height = 16, color = "#667085", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    {...props} // Pass additional props to the SVG element
  >
    <path
      d="M4 6L8 10L12 6"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDownSVG;
