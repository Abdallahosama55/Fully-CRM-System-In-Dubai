import * as React from "react";

const ParagraphSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox="0 0 13.025 14.029"
    {...props}>
    <defs>
      <linearGradient
        id="ParagraphSVG"
        x1={0.931}
        y1={0.118}
        x2={0.067}
        y2={0.867}
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <path
      d="M45.068 32.974a1.008 1.008 0 0 1-1 1.03h-1v11.023a1 1 0 0 1-.974 1 1.045 1.045 0 0 1-1.03-1V34h-1v11.027a1 1 0 0 1-.974 1 1.045 1.045 0 0 1-1.03-1v-3.006h-.786a5.155 5.155 0 0 1-5.2-4.519A5 5 0 0 1 37.023 32h7.014a1 1 0 0 1 1.031.974Z"
      transform="translate(-32.042 -32)"
      fill="url(#ParagraphSVG)"
    />
  </svg>
);

export default ParagraphSVG;
