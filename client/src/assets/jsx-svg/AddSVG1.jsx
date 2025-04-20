import * as React from "react";

const AddSVG1 = (props) => (
  <svg
    data-name="+"
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 35 35"
    {...props}>
    <defs>
      <linearGradient
        id="AddSVG1"
        x1={0.931}
        y1={0.118}
        x2={0.067}
        y2={0.867}
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <ellipse
      data-name="Ellipse 26"
      cx={14.5}
      cy={15}
      rx={14.5}
      ry={15}
      transform="translate(2.864 3.618)"
      fill="#fff"
    />
    <path
      d="M17.5 0A17.5 17.5 0 1 0 35 17.5 17.5 17.5 0 0 0 17.5 0Zm8.352 18.693h-7.159v7.159h-2.386v-7.159H9.148v-2.386h7.159V9.148h2.386v7.159h7.159v2.386Z"
      fillRule="evenodd"
      fill="url(#AddSVG1)"
    />
  </svg>
);

export default AddSVG1;
