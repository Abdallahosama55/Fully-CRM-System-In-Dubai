import * as React from "react";

const PhotoSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} {...props}>
    <g data-name="Group 46896">
      <defs>
        <linearGradient
          id="PhotoSVG"
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
        data-name="Union 73"
        d="M5.015 17A5.022 5.022 0 0 1 0 11.985V5.01A5.019 5.019 0 0 1 5.015 0h6.971A5.019 5.019 0 0 1 17 5.01v6.976A5.022 5.022 0 0 1 11.985 17Zm2.222-7.648 3.295 2.748a2.123 2.123 0 0 0 2.868-.13l.793-.793a.661.661 0 0 0 0-.924.654.654 0 0 0-.924 0l-.793.792a.821.821 0 0 1-1.109.051L8.073 8.351a2.128 2.128 0 0 0-2.642-.069L2.876 10.2a.655.655 0 0 0 .785 1.048l2.556-1.919a.824.824 0 0 1 1.021.022Zm2.352-3.9a1.962 1.962 0 1 0 1.964-1.961 1.967 1.967 0 0 0-1.964 1.956Zm1.179.034a.746.746 0 1 1 .746.746.749.749 0 0 1-.746-.751Z"
        fill={props.color || "url(#PhotoSVG)"}
      />
    </g>
  </svg>
);
export default PhotoSVG;
