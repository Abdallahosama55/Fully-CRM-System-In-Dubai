import * as React from "react";

const ArrowRightSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={12}
    viewBox="0 0 8.353 13.699"
    {...props}
  >
    <path
      d="M5.317 6.805.808 2.293A1.051 1.051 0 1 1 2.293.805L7.545 6.06a1.05 1.05 0 0 1 0 1.486l-5.252 5.251a1.05 1.05 0 0 1-1.485-1.485Z"
      fill={props.color || "#9f9f9f"}
      stroke="rgba(0,0,0,0)"
      data-name="Component/icon/ic_Chevron Right"
    />
  </svg>
);

export default ArrowRightSVG;
