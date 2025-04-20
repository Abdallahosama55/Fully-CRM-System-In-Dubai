import * as React from "react";

const TrendUpSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 19.469 13.888"
    {...props}>
    <defs>
      <linearGradient
        id="TrendUpSVG"
        x1="0.931"
        y1="0.118"
        x2="0.067"
        y2="0.867"
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <path
      data-name="Trend Up 2"
      d="M19.469 6.084V0h-6.084v2.434h1.93l-6.8 6.8L4.867 5.58 0 10.447v3.441l4.867-4.867 3.65 3.65 8.518-8.518v1.93Z"
      fill={props.color || "url(#TrendUpSVG)"}
    />
  </svg>
);

export default TrendUpSVG;
