import * as React from "react";

const EditIconSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} {...props}>
    <defs>
      <linearGradient
        id="EditIconSVG"
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
      d="M29.329 15a2.663 2.663 0 0 0-1.889.782l-1.383 1.383 3.778 3.778 1.383-1.383A2.671 2.671 0 0 0 29.329 15Zm-4.608 3.5-9.445 9.445a.95.95 0 0 0-.277.668v2.442a.945.945 0 0 0 .944.944h2.442a.953.953 0 0 0 .668-.277l9.447-9.443Z"
      transform="translate(-14.5 -14.5)"
      stroke="rgba(0,0,0,0)"
      fill="url(#EditIconSVG)"
    />
  </svg>
);

export default EditIconSVG;
