import * as React from "react";

const HatSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 17 16.354" {...props}>
    <defs>
      <linearGradient
        id="HatSVG"
        x1="0.931"
        y1="0.118"
        x2="0.067"
        y2="0.867"
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <g data-name="iconspace_Colleague Hat_25px">
      <path
        data-name="Path 50500"
        d="M14.094 14.653c0-.4.395-1.029 1.2-1.841.809.812 1.2 1.439 1.2 1.841a1.203 1.203 0 0 1-2.406 0ZM3 11.653a.417.417 0 0 1-.1-.268V7.698l4.617 2.565a1.223 1.223 0 0 0 .586.15 1.193 1.193 0 0 0 .578-.15l4.617-2.565v3.687a.4.4 0 0 1-.1.268c-.973 1.109-2.684 1.645-5.094 1.645S3.973 12.767 3 11.657Zm12.574.306-.277-.26-.277.26-.125.121v-6.5l-6.6 3.666a.4.4 0 0 1-.391 0l-7.2-4a.4.4 0 0 1 0-.7l7.2-4a.413.413 0 0 1 .391 0l7.145 3.972a.4.4 0 0 1 .262.376v7.181a.91.91 0 0 1-.128-.112Z"
        fill={props.color || "url(#HatSVG)"}
        stroke="rgba(0,0,0,0)"
      />
    </g>
  </svg>
);

export default HatSVG;
