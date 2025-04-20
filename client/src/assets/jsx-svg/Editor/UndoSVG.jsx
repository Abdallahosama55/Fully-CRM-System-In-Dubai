import * as React from "react"
const UndoSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212529"
      d="M12.5 6.25H4.884l2.242-2.241-.876-.884-3.75 3.75 3.75 3.75.876-.884L4.886 7.5H12.5a3.75 3.75 0 0 1 0 7.5h-5v1.25h5a5 5 0 1 0 0-10Z"
      style={{
        fill: "#212529",
        fill: "color(display-p3 .1294 .1451 .1608)",
        fillOpacity: 1,
      }}
    />
  </svg>
)
export default UndoSVG
