import * as React from "react";

const StepWithTextSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props?.width || 186} height={40} fill="none" {...props}>
    <path
      fill="#F6F6F7"
      stroke="#E5E5EA"
      d="M2.643 9.915C-.857 6.46 1.59.5 6.507.5h158.555c1.446 0 2.834.57 3.863 1.585l14.187 14a5.5 5.5 0 0 1 0 7.83l-14.187 14a5.499 5.499 0 0 1-3.863 1.585H6.507c-4.918 0-7.364-5.96-3.864-9.415l5.532-5.459a6.5 6.5 0 0 0 0-9.253L2.643 9.915Z"
      style={{
        fill: props.fill || "color(display-p3 .9647 .9647 .9686)",
        fillOpacity: 1,
        stroke: "#e5e5ea",
        strokeOpacity: 1,
      }}
    />
    <text
      xmlns="http://www.w3.org/2000/svg"
      x="50%"
      y="50%"
      fill={props.textColor || "#030713"}
      dominantBaseline="middle"
      textAnchor="middle">
      {props.text || ""}
    </text>
  </svg>
);
export default StepWithTextSVG;
