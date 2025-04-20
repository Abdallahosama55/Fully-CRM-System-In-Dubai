import * as React from "react"
const ReceiptSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#344054"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M2.667 5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.186 2 4.747 2 5.867 2h4.266c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.428.218.988.218 2.108V14L11.5 12.667 9.833 14 8 12.667 6.167 14 4.5 12.667 2.667 14V5.2Z"
      style={{
        stroke: props.color || "#344054",
        stroke: "color(display-p3 .2053 .2525 .328)",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default ReceiptSVG
