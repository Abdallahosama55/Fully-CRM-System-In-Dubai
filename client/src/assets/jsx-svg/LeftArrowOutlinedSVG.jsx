import * as React from "react";

const LeftArrowOutlinedSVG = (props) => (
  <svg
    width="20"
    height="9"
    viewBox="0 0 20 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M4.75 8.25L1 4.5M1 4.5L4.75 0.75M1 4.5H19"
      stroke={props?.stroke ?? "#030713"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LeftArrowOutlinedSVG;
