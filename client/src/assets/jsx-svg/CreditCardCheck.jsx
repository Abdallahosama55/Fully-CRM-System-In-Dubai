
import * as React from "react"
const CreditCardCheck = (props) => (
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
      d="M10.667 12 12 13.334l2.667-2.667m0-4H1.333M14.667 8V5.467c0-.747 0-1.12-.146-1.405a1.333 1.333 0 0 0-.582-.583c-.286-.146-.659-.146-1.406-.146H3.467c-.747 0-1.12 0-1.406.146-.25.128-.454.332-.582.583-.146.285-.146.658-.146 1.405v5.067c0 .746 0 1.12.146 1.405.128.25.331.455.582.582.286.146.659.146 1.406.146H8"
      style={{
        stroke: props.color || "#344054",
        stroke: "color(display-p3 .2053 .2525 .328)",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default CreditCardCheck
