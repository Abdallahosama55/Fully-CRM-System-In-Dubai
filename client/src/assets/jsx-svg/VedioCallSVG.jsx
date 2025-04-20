import * as React from "react"
const VedioCallSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#030713"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.875 5.25 2.36-2.36a.375.375 0 0 1 .64.265v5.69a.375.375 0 0 1-.64.265l-2.36-2.36M2.25 9.375h4.5A1.125 1.125 0 0 0 7.875 8.25v-4.5A1.125 1.125 0 0 0 6.75 2.625h-4.5A1.125 1.125 0 0 0 1.125 3.75v4.5A1.125 1.125 0 0 0 2.25 9.375Z"
      style={{
        stroke: "#030713",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default VedioCallSVG
