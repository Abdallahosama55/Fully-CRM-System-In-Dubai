import React from "react";

const OpenSubMenuSVG = ({ color = "#667085", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <path d="M3 7H13" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M3 17H13" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M3 12H11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path
      d="M17 8L20.6464 11.6464C20.8417 11.8417 20.8417 12.1583 20.6464 12.3536L17 16"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export default OpenSubMenuSVG;
