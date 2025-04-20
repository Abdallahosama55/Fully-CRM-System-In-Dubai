import * as React from "react";

const ShareArObjectSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16.5 18.808"
    {...props}
  >
    <path
      data-name="AR object"
      d="m9.1 11.919 7.4-5.08v7.9l-7.4 4.069ZM0 14.743v-7.9l7.4 5.08v6.888Zm.636-9.515L8.251 0l7.613 5.228-7.613 5.232Z"
      fill={props.color || "#2d2d2d"}
    />
  </svg>
);

export default ShareArObjectSVG;
