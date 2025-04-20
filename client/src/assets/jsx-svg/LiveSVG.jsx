import * as React from "react";

const LiveSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 20 19.337"
    {...props}
  >
    <defs>
      <linearGradient
        id="LiveSVG"
        x1="0.931"
        y1="0.118"
        x2="0.067"
        y2="0.867"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <g fill={props.color || "url(#LiveSVG)"}>
      <path
        data-name="Path 48943"
        d="M14.117 13.436a5.817 5.817 0 1 0-8.226 0 5.819 5.819 0 0 0 8.226 0Z"
      />
      <path
        data-name="Path 48944"
        d="M6.517 0a.848.848 0 0 0-.26.047 9.959 9.959 0 0 0-6.17 10.534.7.7 0 0 0 1.387-.177A8.555 8.555 0 0 1 6.769 1.35.712.712 0 0 0 7.16.438.7.7 0 0 0 6.517 0Z"
      />
      <path
        data-name="Path 48945"
        d="M4.285 15.969a.7.7 0 0 0-.549.27.69.69 0 0 0 .121.977 9.969 9.969 0 0 0 12.2.074.7.7 0 0 0-.847-1.107 8.585 8.585 0 0 1-10.5-.065.686.686 0 0 0-.425-.149Z"
      />
      <path
        data-name="Path 48946"
        d="M13.496 0a.7.7 0 0 0-.26 1.349 8.517 8.517 0 0 1 4.224 3.666 8.419 8.419 0 0 1 1.07 5.379.7.7 0 0 0 1.387.177A9.962 9.962 0 0 0 13.747.037 1.012 1.012 0 0 0 13.496 0Z"
      />
    </g>
  </svg>
);

export default LiveSVG;
