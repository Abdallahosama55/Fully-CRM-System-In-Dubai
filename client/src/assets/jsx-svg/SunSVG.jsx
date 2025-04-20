import React from "react";
import PropTypes from "prop-types";

const SunSVG = ({ color = "#667085", props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}>
    <g clipPath="url(#clip0_737_33865)">
      <path
        d="M7.99967 1.33301V2.66634M7.99967 13.333V14.6663M2.66634 7.99967H1.33301M4.20908 4.20908L3.26628 3.26628M11.7903 4.20908L12.7331 3.26628M4.20908 11.793L3.26628 12.7358M11.7903 11.793L12.7331 12.7358M14.6663 7.99967H13.333M11.333 7.99967C11.333 9.84062 9.84062 11.333 7.99967 11.333C6.15872 11.333 4.66634 9.84062 4.66634 7.99967C4.66634 6.15872 6.15872 4.66634 7.99967 4.66634C9.84062 4.66634 11.333 6.15872 11.333 7.99967Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_737_33865">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

SunSVG.propTypes = {
  color: PropTypes.string,
};

export default SunSVG;
