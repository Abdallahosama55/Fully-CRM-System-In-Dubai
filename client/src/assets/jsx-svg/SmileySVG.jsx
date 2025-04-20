import * as React from "react";

const SmileySVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} {...props}>
    <defs>
      <linearGradient
        id="SmileySVG"
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
      data-name="cheer up, emoji, emoticon, smile, smiley"
      d="M23.5 31.682a8.274 8.274 0 0 0 6.6-3.338 2.046 2.046 0 1 1 3.17 2.585 12.273 12.273 0 0 1-19.534 0 2.046 2.046 0 1 1 3.17-2.585 8.274 8.274 0 0 0 6.6 3.338ZM1 23.5A22.5 22.5 0 1 1 23.5 46 22.5 22.5 0 0 1 1 23.5Zm4.091 0A18.409 18.409 0 1 0 23.5 5.091 18.409 18.409 0 0 0 5.091 23.5Zm22.5 0a2.045 2.045 0 0 0 2.045-2.045 2.045 2.045 0 1 1 4.091 0 2.045 2.045 0 1 0 4.091 0 6.136 6.136 0 0 0-12.273 0 2.045 2.045 0 0 0 2.046 2.045Zm-14.318-2.045a2.045 2.045 0 1 1 4.091 0 2.045 2.045 0 1 0 4.091 0 6.136 6.136 0 1 0-12.273 0 2.045 2.045 0 1 0 4.091 0Z"
      transform="translate(-1 -1)"
      fill="url(#SmileySVG)"
    />
  </svg>
);

export default SmileySVG;
