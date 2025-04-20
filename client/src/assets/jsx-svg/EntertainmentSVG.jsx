import * as React from "react";

const EntertainmentSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 17.71" {...props}>
    <defs>
      <linearGradient
        id="EntertainmentSVG"
        x1="0.931"
        y1="0.118"
        x2="0.067"
        y2="0.867"
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <path
      data-name="Path 1467"
      d="M15.486 17.711H9.348v-1.027h.51v-.953a1.907 1.907 0 1 0-3.809 0v.953h.7v1.027H.518a.514.514 0 0 1-.37-.869c.691-.717.95-3.256.951-4.688h1.027a18.228 18.228 0 0 1-.243 2.856h1.889v1.027H1.65a5.823 5.823 0 0 1-.226.647h3.6v-.953a2.933 2.933 0 1 1 5.862 0v.953h3.7a5.872 5.872 0 0 1-.223-.647H12.33V15.01h1.806a18.135 18.135 0 0 1-.225-2.859l1.027.006c-.008 1.432.235 3.969.923 4.684a.514.514 0 0 1-.375.87ZM8.653 3.617H7.626c0-4.49-.528-4.11 3.208-2.535a.514.514 0 0 1 0 .947l-2.179.9Zm0-1.794.652-.271-.652-.275Zm-4.135 8.956a6761.721 6761.721 0 0 1 7.066-.026 2.178 2.178 0 0 0 3.95-1.327v-.872c0-.43.234-.177-7.123-4.186-.335-.182.1-.317-7.58 3.773-.351.187-.272.485-.272 1.325a2.179 2.179 0 0 0 3.959 1.312Z"
      fill={props.color || "url(#EntertainmentSVG)"}
    />
  </svg>
);

export default EntertainmentSVG;
