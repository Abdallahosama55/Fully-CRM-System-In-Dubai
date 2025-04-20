import * as React from "react"
const CodeSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212529"
      d="M19.375 10 15 14.375l-.881-.881L17.606 10 14.12 6.506 15 5.625 19.375 10ZM.625 10 5 5.625l.881.881L2.394 10l3.487 3.494-.881.881L.625 10Zm7.138 5.928L11.024 3.75l1.207.323L8.97 16.25l-1.208-.322Z"
      style={{
        fill: "#212529",
        fill: "color(display-p3 .1294 .1451 .1608)",
        fillOpacity: 1,
      }}
    />
  </svg>
)
export default CodeSVG
