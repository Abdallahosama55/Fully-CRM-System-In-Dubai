import * as React from "react";
const FeedsSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    {...props}
  >
    <g data-name="Layer 2">
      <path
        fill={props.fill}
        d="M20 22.75H4A2.752 2.752 0 0 1 1.25 20V4A2.752 2.752 0 0 1 4 1.25h16A2.752 2.752 0 0 1 22.75 4v16A2.752 2.752 0 0 1 20 22.75zm-16-20A1.252 1.252 0 0 0 2.75 4v16A1.252 1.252 0 0 0 4 21.25h16A1.252 1.252 0 0 0 21.25 20V4A1.252 1.252 0 0 0 20 2.75z"
      />
      <path
        fill={props.fill}
        d="M15.5 22.75h-7a.75.75 0 0 1-.75-.75V2a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 .75.75v20a.75.75 0 0 1-.75.75zm-6.25-1.5h5.5V2.75h-5.5z"
      />
      <path
        fill={props.fill}
        d="M22 16.25H2a.75.75 0 0 1-.75-.75v-7A.75.75 0 0 1 2 7.75h20a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75zm-19.25-1.5h18.5v-5.5H2.75z"
      />
    </g>
  </svg>
);
export default FeedsSVG;
