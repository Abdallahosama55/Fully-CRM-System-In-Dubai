import * as React from "react"
const GlobalSVG = ({ width = 20, height = 20, color = "#3F65E4", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_2757_6589)">
      <path
        d="M1.66675 10H18.3334M1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333M1.66675 10C1.66675 5.39763 5.39771 1.66667 10.0001 1.66667M18.3334 10C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333M18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667M10.0001 1.66667C12.0845 3.94863 13.269 6.91003 13.3334 10C13.269 13.09 12.0845 16.0514 10.0001 18.3333M10.0001 1.66667C7.91568 3.94863 6.73112 6.91003 6.66675 10C6.73112 13.09 7.91568 16.0514 10.0001 18.3333"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2757_6589">
        <rect
          width="20"
          height="20"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export default GlobalSVG;
