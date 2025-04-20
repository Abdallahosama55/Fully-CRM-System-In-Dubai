import * as React from "react";
const ChevronRightSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="m7.5 15 5-5-5-5"
      stroke="currentColor"
      style={{
        stroke: "currentColor",
        strokeOpacity: 1,
      }}
      strokeWidth={props?.strokeWidth || 1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ChevronRightSVG;
