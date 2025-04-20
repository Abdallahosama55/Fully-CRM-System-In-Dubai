import * as React from "react"
const InsightsSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.333 11h-2.9c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437c-.109.214-.109.494-.109 1.054V21m13.5-10h2.9c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437c.11.214.11.494.11 1.054V21m-4.5 0V6.2c0-1.12 0-1.68-.219-2.108a2 2 0 0 0-.874-.874C15.813 3 15.253 3 14.133 3h-2.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874c-.218.428-.218.988-.218 2.108V21m14.5 0h-20m9-14h2m-2 4h2m-2 4h2"
      style={{
        stroke: props.color || "#000",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default InsightsSVG
