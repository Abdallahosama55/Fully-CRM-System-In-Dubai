import * as React from "react"
const ThreeDModelSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#5988F1"
        d="M18.446 4.786 10.293.079a.586.586 0 0 0-.586 0L1.554 4.786a.586.586 0 0 0-.293.507v9.414c0 .21.112.403.293.507l8.153 4.708a.586.586 0 0 0 .586 0l8.153-4.708a.586.586 0 0 0 .293-.507V5.293a.586.586 0 0 0-.293-.507Z"
        style={{
          fill: "#5988f1",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#724CE0"
        d="m10 10 8.66 5a.585.585 0 0 0 .079-.293V5.293a.586.586 0 0 0-.293-.507L10.293.079A.586.586 0 0 0 10 0v10Z"
        style={{
          fill: "#724ce0",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#76BEF4"
        d="m10 10-8.66 5c.05.088.124.162.214.214l8.153 4.708c.09.052.192.078.293.078V10Z"
        style={{
          fill: "#76bef4",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#FF7DE0"
        d="m15.314 6.594-5.021-2.899a.586.586 0 0 0-.586 0l-5.02 2.899a.586.586 0 0 0-.294.507V12.9c0 .21.112.403.293.507l5.021 2.899a.586.586 0 0 0 .586 0l5.02-2.899a.586.586 0 0 0 .294-.507V7.1a.586.586 0 0 0-.293-.507Z"
        style={{
          fill: "#ff7de0",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#FF4AC1"
        d="M10 10v6.383a.586.586 0 0 0 .293-.078l5.02-2.899a.586.586 0 0 0 .294-.507V7.1a.585.585 0 0 0-.079-.293L10 10Z"
        style={{
          fill: "#ff4ac1",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#FFAEFF"
        d="M10 3.617a.586.586 0 0 0-.293.078l-5.02 2.899a.586.586 0 0 0-.215.214L10 10V3.617Z"
        style={{
          fill: "#ffaeff",
          fillOpacity: 1,
        }}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0h20v20H0z"
          style={{
            fill: "#fff",
            fillOpacity: 1,
          }}
        />
      </clipPath>
    </defs>
  </svg>
)
export default ThreeDModelSVG
