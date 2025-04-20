import * as React from "react"
const CloseSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#313342"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 17.5 7 7.5m10 0-10 10"
      style={{
        stroke: props.color || "#313342",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default CloseSVG
