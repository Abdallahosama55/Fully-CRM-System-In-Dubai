import * as React from "react"
const BoldSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212529"
      d="M11.406 15.625H5.625V4.375h5.313a3.281 3.281 0 0 1 2.5 5.406 3.281 3.281 0 0 1-2.032 5.844ZM7.5 13.75h3.894a1.408 1.408 0 0 0 .994-2.4 1.407 1.407 0 0 0-.994-.412H7.5v2.812Zm0-4.688h3.438a1.406 1.406 0 1 0 0-2.812H7.5v2.813Z"
      style={{
        fill: "#212529",
        fill: "color(display-p3 .1294 .1451 .1608)",
        fillOpacity: 1,
      }}
    />
  </svg>
)
export default BoldSVG
