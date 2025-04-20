import React from "react";
import PropTypes from "prop-types";

const MoonSVG = ({ color = "#667085", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}>
    <g clipPath="url(#clip0_737_33888)">
      <path
        d="M14.6663 10.5625C13.7907 10.9585 12.8188 11.1789 11.7953 11.1789C7.9432 11.1789 4.82044 8.05615 4.82044 4.20403C4.82044 3.18058 5.04088 2.20861 5.43686 1.33301C3.01685 2.42743 1.33301 4.86281 1.33301 7.69147C1.33301 11.5436 4.45577 14.6663 8.30788 14.6663C11.1365 14.6663 13.5719 12.9825 14.6663 10.5625Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_737_33888">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

MoonSVG.propTypes = {
  color: PropTypes.string,
};

export default MoonSVG;
