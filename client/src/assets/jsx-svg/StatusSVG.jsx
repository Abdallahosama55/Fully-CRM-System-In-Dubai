import * as React from "react";
import { memo } from "react";
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" {...props}>
    <g fill={props.fill || "#313342"} clipPath="url(#a)">
      <path
        d="M10 15.167H6C2.38 15.167.833 13.62.833 10V6C.833 2.38 2.38.833 6 .833h4c3.62 0 5.167 1.547 5.167 5.167v4c0 3.62-1.547 5.167-5.167 5.167ZM6 1.833C2.927 1.833 1.833 2.927 1.833 6v4c0 3.073 1.094 4.167 4.167 4.167h4c3.073 0 4.167-1.094 4.167-4.167V6c0-3.073-1.094-4.167-4.167-4.167H6Z"
        style={{
          fill: props.fill || "#313342",
          fillOpacity: 1,
        }}
      />
      <path
        d="M4.887 10.16a.49.49 0 0 1-.307-.107.499.499 0 0 1-.093-.7l1.586-2.06a1.172 1.172 0 0 1 1.647-.206l1.22.96c.047.04.093.04.127.033.026 0 .073-.013.113-.067l1.54-1.986a.493.493 0 0 1 .7-.087c.22.167.26.48.087.7l-1.54 1.987a1.138 1.138 0 0 1-.78.44c-.314.04-.62-.047-.867-.24l-1.22-.96a.146.146 0 0 0-.127-.034c-.026 0-.073.014-.113.067L5.273 9.96a.452.452 0 0 1-.386.2Z"
        style={{
          fill: props.fill || "#313342",
          fillOpacity: 1,
        }}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0h16v16H0z"
          style={{
            fill: "#fff",
            fillOpacity: 1,
          }}
        />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
