import * as React from "react"
const ItalicSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212529"
      d="M15.625 5.625v-1.25H7.5v1.25h3.213l-2.732 8.75H4.375v1.25H12.5v-1.25H9.287l2.732-8.75h3.606Z"
      style={{
        fill: "#212529",
        fill: "color(display-p3 .1294 .1451 .1608)",
        fillOpacity: 1,
      }}
    />
  </svg>
)
export default ItalicSVG
