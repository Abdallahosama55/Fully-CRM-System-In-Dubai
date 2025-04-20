import * as React from "react";

const MessageSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 28.467 28.119"
    {...props}
  >
    <g data-name="message icon">
      <path
        data-name="Path 48"
        d="M23.977.9H4.489a3.55 3.55 0 0 0-2.534 1.083A3.74 3.74 0 0 0 .9 4.584v12.632a3.743 3.743 0 0 0 1.055 2.6 3.554 3.554 0 0 0 2.535 1.081h2.563v5.267l6.008-5.141a.505.505 0 0 1 .329-.123h10.587a3.554 3.554 0 0 0 2.535-1.081 3.743 3.743 0 0 0 1.055-2.6V4.584a3.74 3.74 0 0 0-1.055-2.6A3.55 3.55 0 0 0 23.977.902Z"
        fill="none"
        stroke="rgba(165,162,153)"
        strokeWidth={1.8}
      />
      <path
        data-name="Path 49"
        d="M8.082 13.005a2.106 2.106 0 1 0-2.052-2.1 2.079 2.079 0 0 0 2.052 2.1Z"
        fill={props.color || "rgba(165,162,153)"}
      />
      <path
        data-name="Path 50"
        d="M14.234 13.005a2.106 2.106 0 1 0-2.051-2.1 2.078 2.078 0 0 0 2.051 2.1Z"
        fill={props.color || "rgba(165,162,153)"}
      />
      <path
        data-name="Path 51"
        d="M20.387 13.005a2.106 2.106 0 1 0-2.051-2.1 2.079 2.079 0 0 0 2.051 2.1Z"
        fill={props.color || "rgba(165,162,153)"}
      />
    </g>
  </svg>
);

export default MessageSVG;
