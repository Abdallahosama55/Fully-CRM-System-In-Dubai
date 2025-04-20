import * as React from "react"
const UploadCloudSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={46}
    fill="none"
    {...props}
  >
    <rect
      width={40}
      height={40}
      x={3}
      y={3}
      fill="#F2F4F7"
      rx={20}
      style={{
        fill: "#f2f4f7",
        fill: "color(display-p3 .9498 .9558 .9679)",
        fillOpacity: 1,
      }}
    />
    <rect
      width={40}
      height={40}
      x={3}
      y={3}
      stroke="#F9FAFB"
      strokeWidth={6}
      rx={20}
      style={{
        stroke: "#f9fafb",
        stroke: "color(display-p3 .9752 .98 .9848)",
        strokeOpacity: 1,
      }}
    />
    <path
      stroke="#475467"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M19.667 26.333 23 23m0 0 3.333 3.333M23 23v7.5m6.667-3.548a4.583 4.583 0 0 0-2.917-8.12.516.516 0 0 1-.445-.25 6.25 6.25 0 1 0-9.816 7.58"
      style={{
        stroke: "#475467",
        stroke: "color(display-p3 .2798 .3309 .4026)",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default UploadCloudSVG
