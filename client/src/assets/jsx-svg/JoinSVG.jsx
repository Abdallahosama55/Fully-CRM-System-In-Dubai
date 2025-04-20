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
      fill="#fff"
      fillRule="evenodd"
      d="M15.797 3.4a1.8 1.8 0 0 0-1.8-1.8h-4.4a1.8 1.8 0 0 0-1.8 1.8V5a.6.6 0 1 0 1.2 0V3.4a.6.6 0 0 1 .6-.6h4.4a.6.6 0 0 1 .6.6v9.2a.6.6 0 0 1-.6.6h-4.4a.6.6 0 0 1-.6-.6V11a.6.6 0 0 0-1.2 0v1.6a1.8 1.8 0 0 0 1.8 1.8h4.4a1.8 1.8 0 0 0 1.8-1.8V3.4Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M2.999 8a.6.6 0 0 1 .6-.6h7.636l-.838-.754a.6.6 0 1 1 .803-.891l2 1.8a.6.6 0 0 1 0 .89l-2 1.8a.6.6 0 1 1-.803-.89l.838-.755H3.6a.6.6 0 0 1-.6-.6Z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
