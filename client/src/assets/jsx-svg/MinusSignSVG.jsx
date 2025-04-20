import React from 'react';

const MinusSignSVG = ({ color = "#000000", width = 21, height = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 21 20"
    fill="none"
    {...props} // This allows passing other SVG props like width, height, etc.
  >
    <path
      d="M19.1334 10H2.46674" // The path for the minus icon
      stroke={color} // Set stroke color to the `color` prop
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MinusSignSVG;
