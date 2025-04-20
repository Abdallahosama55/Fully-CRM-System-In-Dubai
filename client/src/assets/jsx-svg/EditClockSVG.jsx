import * as React from "react";
import { memo } from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    fill="none"
    {...props}>
    <path
      fill="#3A5EE3"
      d="M7.516 0a7.5 7.5 0 0 0 0 15v-1.5A6 6 0 1 1 13.328 9h1.538a7.499 7.499 0 0 0-7.35-9Zm4.5 8.251h-5.25V3h1.5v3.751h3.75v1.5Zm2.715 5.093L12.085 16h-1.07v-1.065l2.656-2.648 1.06 1.057Zm1.035-1.058-.533.533-1.065-1.065.533-.533a.753.753 0 0 1 1.065 1.065Z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
