import * as React from "react";

const AirplaneSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 20" {...props}>
    <defs>
      <linearGradient
        id="AirplaneSVG"
        x1="0.931"
        y1="0.118"
        x2="0.067"
        y2="0.867"
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor={props.color ? props.color : "#3A5EE3"} />
        <stop offset="1" stopColor={props.color ? props.color : "#8FCAF3"} />
      </linearGradient>
    </defs>
    <path
      d="M7.895 0a.526.526 0 0 0-.521.6L8.43 8.2l-3.579.115L4.2 6.507a1.08 1.08 0 0 0-1.018-.718h-.55a.527.527 0 0 0-.526.526V8.4l-.526.017a1.579 1.579 0 0 0 0 3.158l.526.017v2.088a.526.526 0 0 0 .526.526h.554a1.08 1.08 0 0 0 1.014-.713l.647-1.808 3.579.115-1.056 7.6a.526.526 0 0 0 .521.6h.593a1.043 1.043 0 0 0 .932-.577l3.736-7.471 4.638.15h.1a2.106 2.106 0 1 0 0-4.211l-4.739.153L9.42.577A1.043 1.043 0 0 0 8.488 0Z"
      fill={props.color || "url(#AirplaneSVG)"}
    />
  </svg>
);

export default AirplaneSVG;
