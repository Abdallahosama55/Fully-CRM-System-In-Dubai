import * as React from "react";
const MessagesSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    viewBox="0 0 21 21"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M5.345 9.43a7 7 0 0 1-.079-1.023c0-3.682 3.005-6.667 6.71-6.667 3.707 0 6.711 2.985 6.711 6.667 0 .832-.153 1.628-.433 2.362a2 2 0 0 0-.1.288 1 1 0 0 0-.02.161 2 2 0 0 0 .023.262l.336 2.726c.036.295.054.442.005.55a.42.42 0 0 1-.214.209c-.108.046-.255.025-.55-.018l-2.654-.39a2 2 0 0 0-.27-.03 1 1 0 0 0-.168.018c-.061.013-.14.043-.298.102a6.74 6.74 0 0 1-3.392.35m-4.326 3.41c2.47 0 4.474-2.052 4.474-4.583S9.097 9.24 6.626 9.24s-4.474 2.052-4.474 4.584c0 .508.081.998.23 1.455.064.194.095.29.106.356a.7.7 0 0 1 .009.178 2 2 0 0 1-.054.292l-.51 2.302 2.496-.34a2 2 0 0 1 .264-.028c.062 0 .095.003.157.016.058.011.145.042.318.103.457.161.948.249 1.458.249"
        stroke="currentColor"
        style={{
          stroke: "currentColor",
          strokeOpacity: 1,
        }}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="currentColor"
          style={{
            fill: "currentColor",
            fillOpacity: 1,
          }}
          transform="translate(.267 .074)"
          d="M0 0h20v20H0z"
        />
      </clipPath>
    </defs>
  </svg>
);
export default MessagesSVG;
