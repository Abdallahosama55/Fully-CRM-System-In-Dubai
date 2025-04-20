import React from "react";

function RightSlideSVG(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.01}
      height={17.01}
      viewBox="0 0 17 17"
      {...props}
    >
      <defs>
        <filter
          id="a"
          width={17}
          height={17}
          x={0}
          y={0}
          filterUnits="userSpaceOnUse"
        >
          <feOffset />
          <feGaussianBlur result="blur" stdDeviation={0.5} />
          <feFlood floodOpacity={0.078} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#a)">
        <path
          fill="#fff"
          d="M8.5 15.5a7 7 0 1 1 7-7 7 7 0 0 1-7 7ZM7.189 4.683a.639.639 0 0 0-.45.185.636.636 0 0 0 0 .9L9.471 8.5l-2.732 2.734a.622.622 0 0 0-.186.446.638.638 0 0 0 1.086.454L10.82 8.95a.633.633 0 0 0 0-.9L7.639 4.868a.635.635 0 0 0-.45-.185Z"
          data-name="Exclusion 7"
          opacity={0.502}
        />
      </g>
    </svg>
  );
}

export default RightSlideSVG;
