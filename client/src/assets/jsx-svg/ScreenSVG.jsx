import * as React from "react";

const ScreenSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24.001}
    height={24.001}
    viewBox="0 0 28 25.545"
    {...props}>
    <path
      fill={props.color || "#fff"}
      stroke="rgba(0,0,0,0)"
      d="M2.955.5A2.454 2.454 0 0 0 .5 2.955v14.727a2.454 2.454 0 0 0 2.455 2.455h8.591a2.454 2.454 0 0 1-2.455 2.455v2.455h9.818v-2.456a2.454 2.454 0 0 1-2.455-2.455h8.591a2.454 2.454 0 0 0 2.455-2.454V2.955A2.454 2.454 0 0 0 25.045.5Zm0 2.455h22.09v12.272H2.955ZM14 16.455a1.227 1.227 0 1 1-1.227 1.227A1.228 1.228 0 0 1 14 16.455Z"
      data-name="share screen"
    />
  </svg>
);

export default ScreenSVG;
