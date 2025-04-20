import * as React from "react"
const BuildingSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill={props.fill || "#313342"}
        d="M6.417 0H1.75A1.75 1.75 0 0 0 0 1.75V14h8.167V1.75A1.75 1.75 0 0 0 6.417 0ZM3.5 11.083H1.75V9.917H3.5v1.166Zm0-2.333H1.75V7.583H3.5V8.75Zm0-2.333H1.75V5.25H3.5v1.167Zm0-2.334H1.75V2.917H3.5v1.166Zm2.917 7h-1.75V9.917h1.75v1.166Zm0-2.333h-1.75V7.583h1.75V8.75Zm0-2.333h-1.75V5.25h1.75v1.167Zm0-2.334h-1.75V2.917h1.75v1.166Zm5.833-1.166H9.333V14H14V4.667a1.75 1.75 0 0 0-1.75-1.75Zm0 8.166h-1.167V9.917h1.167v1.166Zm0-2.333h-1.167V7.583h1.167V8.75Zm0-2.333h-1.167V5.25h1.167v1.167Z"
        style={{
          fill: props.fill || "#313342",
          fillOpacity: 1,
        }}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0h14v14H0z"
          style={{
            fill: "#fff",
            fillOpacity: 1,
          }}
        />
      </clipPath>
    </defs>
  </svg>
)
export default BuildingSVG
