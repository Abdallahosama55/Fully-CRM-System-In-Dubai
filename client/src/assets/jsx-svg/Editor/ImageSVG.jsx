import * as React from "react"
const ImageSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212529"
      d="M11.875 8.75a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Zm0-2.5a.625.625 0 1 1 0 1.25.625.625 0 0 1 0-1.25Z"
      style={{
        fill: "#212529",
        fill: "color(display-p3 .1294 .1451 .1608)",
        fillOpacity: 1,
      }}
    />
    <path
      fill="#212529"
      d="M16.25 2.5H3.75A1.25 1.25 0 0 0 2.5 3.75v12.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25V3.75a1.25 1.25 0 0 0-1.25-1.25Zm0 13.75H3.75V12.5l3.125-3.125 3.494 3.494a1.25 1.25 0 0 0 1.762 0l.994-.994L16.25 15v1.25Zm0-3.019-2.244-2.243a1.25 1.25 0 0 0-1.762 0l-.994.993-3.494-3.493a1.25 1.25 0 0 0-1.762 0L3.75 10.73V3.75h12.5v9.481Z"
      style={{
        fill: "#212529",
        fill: "color(display-p3 .1294 .1451 .1608)",
        fillOpacity: 1,
      }}
    />
  </svg>
)
export default ImageSVG
