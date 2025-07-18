import * as React from "react";
const HTML5SVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 32 32"
    {...props}>
    <title>{"html5"}</title>
    <path d="m11.677 13.196-.289-3.387 12.536.004.287-3.268L7.79 6.541l.87 9.983h11.374l-.406 4.27-3.627 1.002-3.683-1.009-.234-2.63H8.832l.411 5.198L16 25.162l6.704-1.798.927-10.166H11.677zM2.914 1.045h26.172l-2.38 26.874-10.734 3.037-10.673-3.038z" />
  </svg>
);
export default HTML5SVG;
