import * as React from "react";

const CalenderBtnSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 17.951" {...props}>
    <defs>
      <linearGradient
        id="CalenderBtnSVG"
        x1={0.931}
        y1={0.118}
        x2={0.067}
        y2={0.867}
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <g data-name="Group 14">
      <path
        data-name="Union 11"
        d="M2.819 17.951A2.823 2.823 0 0 1 0 15.125V1.022h4.1V.771a.77.77 0 1 1 1.539 0v.251h8.716V.771a.77.77 0 1 1 1.539 0v.251H20v14.1a2.828 2.828 0 0 1-2.819 2.826Zm-1.281-2.826a1.283 1.283 0 0 0 1.281 1.289h14.362a1.287 1.287 0 0 0 1.281-1.289V7.693H1.538Zm0-8.972h16.924V3.847a1.284 1.284 0 0 0-1.281-1.286h-1.288v.255a.77.77 0 1 1-1.539 0v-.255H5.639v.255a.77.77 0 1 1-1.539 0v-.255H2.819a1.279 1.279 0 0 0-1.281 1.286Zm12.562 7.69a.77.77 0 1 1 0-1.539h2.05a.77.77 0 1 1 0 1.539Zm-5.131 0a.77.77 0 1 1 0-1.539h2.054a.77.77 0 0 1 0 1.539Zm-5.13 0a.77.77 0 0 1 0-1.539H5.9a.77.77 0 0 1 0 1.539ZM14.1 10.767a.77.77 0 1 1 0-1.539h2.05a.77.77 0 1 1 0 1.539Zm-5.131 0a.77.77 0 1 1 0-1.539h2.054a.77.77 0 0 1 0 1.539Zm-5.13 0a.77.77 0 0 1 0-1.539H5.9a.77.77 0 0 1 0 1.539Z"
        fill={props.gradient ? "url(#CalenderBtnSVG)" : props.color || "#fff"}
      />
    </g>
  </svg>
);

export default CalenderBtnSVG;
