import * as React from "react";

const ShareSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 27.372 24.43"
    {...props}
  >
    <path
      stroke={props.strokeColor}
      data-name="Path 1322"
      d="M16.423 22.9a1.358 1.358 0 0 0 2.3 1.119l.107-.126 8.212-10.686a1.668 1.668 0 0 0 .1-1.839l-.1-.148L18.831.536a1.34 1.34 0 0 0-2.4.82l-.008.173v4.58L15 6.241C6.659 7.017.211 14.683.005 23.969L0 24.427l3.639-2.319a23.789 23.789 0 0 1 12.112-3.777l.672-.01Z"
      fill={props.color || "rgba(165,162,153,0.8)"}
    />
  </svg>
);

export default ShareSVG;
