import * as React from "react"
const ArrowBackSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || "#1D1B20"}
      d="m6.52 10.833 4.668 4.667L10 16.666 3.333 10 10 3.333 11.188 4.5 6.52 9.166h10.146v1.667H6.52Z"
      style={{
        fill: props.fill || "#1d1b20",
        fill: "color(display-p3 .1137 .1059 .1255)",
        fillOpacity: 1,
      }}
    />
  </svg>
)
export default ArrowBackSVG
