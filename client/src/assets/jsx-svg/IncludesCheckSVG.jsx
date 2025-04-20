import * as React from "react";
const IncludesCheckSVG = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={12}
      cy={12}
      r={12}
      fill="#D1FADF"
      style={{
        fill: "#D1FADF",
        fillOpacity: 1,
      }}
    />
    <path
      d="M18 7.5L9.75 15.75L6 12"
      stroke="#12B76A"
      style={{
        stroke: "#12B76A",
        strokeOpacity: 1,
      }}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IncludesCheckSVG;
