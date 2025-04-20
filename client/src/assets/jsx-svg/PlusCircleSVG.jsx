import React from 'react';

const PlusCircleSVG = ({ width = 20, height = 20, color = '#2D6ADB' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M10 6.66602V13.3327M6.66666 9.99935H13.3333M18.3333 9.99935C18.3333 14.6017 14.6024 18.3327 10 18.3327C5.39762 18.3327 1.66666 14.6017 1.66666 9.99935C1.66666 5.39698 5.39762 1.66602 10 1.66602C14.6024 1.66602 18.3333 5.39698 18.3333 9.99935Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlusCircleSVG;
