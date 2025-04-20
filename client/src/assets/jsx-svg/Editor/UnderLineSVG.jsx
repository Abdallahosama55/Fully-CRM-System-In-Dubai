import * as React from "react"
const UnderLineSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212529"
      d="M2.5 16.25h15v1.25h-15v-1.25Zm7.5-1.875A4.375 4.375 0 0 1 5.625 10V3.125h1.25V10a3.125 3.125 0 1 0 6.25 0V3.125h1.25V10A4.375 4.375 0 0 1 10 14.375Z"
      style={{
        fill: "#212529",
        fill: "color(display-p3 .1294 .1451 .1608)",
        fillOpacity: 1,
      }}
    />
  </svg>
)
export default UnderLineSVG
