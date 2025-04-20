import * as React from "react";

const SliderSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} {...props}>
    <defs>
      <linearGradient
        id="SliderSVG"
        x1={0.931}
        y1={0.118}
        x2={0.067}
        y2={0.867}
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <path fill="rgba(255,255,255,0)" d="M0 0h16v16H0z" />
    <path
      d="M689.5 353a2 2 0 0 0-1.966 1.667h-1.7a.333.333 0 1 0 0 .667h1.7A2 2 0 1 0 689.5 353Zm0 3.333a1.333 1.333 0 1 1 1.333-1.333 1.335 1.335 0 0 1-1.333 1.333Zm4-1.333a.333.333 0 0 1 .333-.333h4a.333.333 0 0 1 0 .667h-4a.333.333 0 0 1-.333-.334Zm4.333 6.333h-1.7a2 2 0 1 0 0 .667h1.7a.333.333 0 0 0 0-.667ZM694.167 363a1.333 1.333 0 1 1 1.333-1.333 1.335 1.335 0 0 1-1.333 1.333Zm-4-1.333a.333.333 0 0 1-.333.333h-4a.333.333 0 1 1 0-.667h4a.333.333 0 0 1 .333.334Z"
      transform="translate(-683.833 -350.333)"
      fill="url(#SliderSVG)"
    />
  </svg>
);

export default SliderSVG;
