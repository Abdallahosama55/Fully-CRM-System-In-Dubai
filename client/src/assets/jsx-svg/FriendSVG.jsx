import * as React from "react";

const FriendSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={16}
    viewBox="0 0 25.464 21.115"
    {...props}>
    <defs>
      <linearGradient
        id="FriendSVG"
        x1={0.931}
        y1={0.118}
        x2={0.067}
        y2={0.867}
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <g data-name="add profile, user, people">
      <path
        data-name="verified user, profile, people"
        d="m17.647 20.292 5.864-5.375a1.108 1.108 0 0 1 1.5 1.633l-6.646 6.092a1.108 1.108 0 0 1-1.532-.033l-3.323-3.323a1.108 1.108 0 1 1 1.566-1.566ZM1 21.825a9.98 9.98 0 0 1 6.228-9.234 5.517 5.517 0 1 1 3.74 1.481 7.765 7.765 0 0 0-7.675 6.646h7.675a1.108 1.108 0 1 1 0 2.215h-8.86A1.108 1.108 0 0 1 1 21.825ZM7.646 8.534a3.323 3.323 0 1 0 3.323-3.323 3.323 3.323 0 0 0-3.323 3.323Z"
        transform="translate(-.5 -2.403)"
        stroke="rgba(0,0,0,0)"
        // fill="url(#FriendSVG)"
      />
    </g>
  </svg>
);

export default FriendSVG;
