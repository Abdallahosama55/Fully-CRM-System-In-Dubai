import * as React from "react"
const NotAlowedSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      stroke={props?.color || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="m3.287 3.287 9.426 9.427M14.667 8A6.667 6.667 0 1 1 1.333 8a6.667 6.667 0 0 1 13.334 0Z"
    />
  </svg>
)
export default NotAlowedSVG
