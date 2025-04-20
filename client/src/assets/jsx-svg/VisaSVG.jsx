import * as React from "react"
const VisaSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#3F65E4"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M18.333 8.833H1.667m7.5 3.334H5M1.667 7.333v6.334c0 .933 0 1.4.181 1.756.16.314.415.569.729.729.356.181.823.181 1.756.181h11.334c.933 0 1.4 0 1.756-.181.314-.16.569-.415.729-.729.181-.356.181-.823.181-1.756V7.333c0-.933 0-1.4-.181-1.756a1.666 1.666 0 0 0-.729-.729c-.356-.181-.823-.181-1.756-.181H4.333c-.933 0-1.4 0-1.756.181-.314.16-.569.415-.729.729-.181.356-.181.823-.181 1.756Z"
      style={{
        stroke: props.color || "#3f65e4",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default VisaSVG
