import * as React from "react";

const AlbumsSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 20 20"
    {...props}
  >
    <defs>
      <linearGradient
        id="AlbumsSVG"
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
    <path
      d="M5.556 0a2.239 2.239 0 0 0-2.223 2.222h13.334A2.239 2.239 0 0 0 14.444 0ZM3.333 3.333a2.239 2.239 0 0 0-2.222 2.223h17.778a2.239 2.239 0 0 0-2.222-2.222ZM2.222 6.667A2.224 2.224 0 0 0 0 8.889v8.889A2.224 2.224 0 0 0 2.222 20h15.556A2.224 2.224 0 0 0 20 17.778V8.889a2.224 2.224 0 0 0-2.222-2.222Z"
      fill={props.color || "url(#AlbumsSVG)"}
    />
  </svg>
);

export default AlbumsSVG;
