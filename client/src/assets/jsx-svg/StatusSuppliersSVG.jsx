import * as React from "react";
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <mask
      id="a"
      width={20}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}>
      <path
        fill="#D9D9D9"
        d="M0 0h20v20H0z"
        style={{
          fill: "#d9d9d9",
          fill: "color(display-p3 .851 .851 .851)",
          fillOpacity: 1,
        }}
      />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#3F65E4"
        d="M7.5 16.667c-.264 0-.5-.077-.708-.23a1.347 1.347 0 0 1-.459-.583l-1.916-5.02H.833V9.166h4.75L7.5 14.25l3.833-10.104c.098-.236.25-.43.459-.583.208-.153.444-.23.708-.23.264 0 .5.077.708.23.209.152.361.347.459.583l1.916 5.02h3.584v1.667h-4.75L12.5 5.75 8.667 15.854c-.098.236-.25.43-.459.584-.208.152-.444.229-.708.229Z"
        style={{
          fill: "#3f65e4",
          fill: "color(display-p3 .2471 .3961 .8941)",
          fillOpacity: 1,
        }}
      />
    </g>
  </svg>
);
export default SvgComponent;
