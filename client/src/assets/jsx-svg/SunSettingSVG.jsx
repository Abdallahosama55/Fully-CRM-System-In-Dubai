import React from "react";
import PropTypes from "prop-types";

const SunSettingSVG = ({ color = "#667085", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}>
    <path
      d="M8 2V3.33333M3.54275 4.87608L2.59994 3.93327M12.4572 4.87608L13.4 3.93327M4 10C4 7.79086 5.79086 6 8 6C10.2091 6 12 7.79086 12 10M14.6667 10H1.33334M12.6667 12.6667H3.33334"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

SunSettingSVG.propTypes = {
  color: PropTypes.string,
};

export default SunSettingSVG;
