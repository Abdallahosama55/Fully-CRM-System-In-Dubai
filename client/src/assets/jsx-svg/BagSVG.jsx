import * as React from "react"
const BagSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.667 16.5V15m1.25-3.75v-6m5.416 11.25V15m-1.25-3.75v-6M7.333 15h5.334c1.4 0 2.1 0 2.635-.245.47-.216.852-.56 1.092-.984.273-.48.273-1.11.273-2.371V5.1c0-1.26 0-1.89-.273-2.371a2.39 2.39 0 0 0-1.092-.984c-.535-.245-1.235-.245-2.635-.245H7.333c-1.4 0-2.1 0-2.635.245a2.39 2.39 0 0 0-1.092.984c-.273.48-.273 1.11-.273 2.371v6.3c0 1.26 0 1.89.273 2.371.24.424.622.768 1.092.984C5.233 15 5.933 15 7.333 15Z"
      style={{
        stroke: "#344054",
        stroke: "color(display-p3 .2053 .2525 .328)",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default BagSVG
