import * as React from "react";

const DimSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 20.036 20.311"
    {...props}>
    <defs>
      <linearGradient
        id="DimSVG"
        x1="0.931"
        y1="0.118"
        x2="0.067"
        y2="0.867"
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <g fill={props.color || "url(#DimSVG)"}>
      <path
        data-name="Exclusion 2"
        d="m0 20.311.584-1.959L5.41 5.482 20.036 0l-5.484 14.626-12.824 4.809Zm6.735-13.5L2.841 17.195 13.227 13.3l3.889-10.385Zm3.246 6.444a3.2 3.2 0 1 1 3.2-3.2 3.2 3.2 0 0 1-3.2 3.198Zm0-4.69a1.492 1.492 0 1 0 1.492 1.492 1.494 1.494 0 0 0-1.492-1.494Z"
      />
      <path
        data-name="Union 2"
        d="M1.986 19.256.78 18.05l6.94-6.94 1.206 1.206ZM12.241 9l-1.206-1.206 6.94-6.939 1.206 1.206Z"
      />
    </g>
  </svg>
);

export default DimSVG;
