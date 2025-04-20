import * as React from "react"
const StatementsSVG = (props) => (
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
      d="M14.667 2.27V6.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437c.214.11.494.11 1.054.11h4.13M16.667 13h-8m8 4h-8m2-8h-2m6-7h-5.2c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311c-.327.642-.327 1.482-.327 3.162v10.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.31 1.311C6.947 22 7.787 22 9.468 22h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V8l-6-6Z"
      style={{
        stroke: props.color || "#000",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default StatementsSVG
