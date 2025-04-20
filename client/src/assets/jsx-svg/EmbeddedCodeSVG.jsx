import * as React from "react";
const EmbeddedCodeSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={14}
    height={14}
    viewBox="0 0 57 57"
    {...props}
  >
    <path
      d="M0 0h57v57H0z"
      style={{
        fill: "transparent",
      }}
    />
    <path
      d="M20 44a.997.997 0 0 1-.707-.293L4.586 29l14.707-14.707a.999.999 0 1 1 1.414 1.414L7.414 29l13.293 13.293A.999.999 0 0 1 20 44zM37 44a.999.999 0 0 1-.707-1.707L49.586 29 36.293 15.707a.999.999 0 1 1 1.414-1.414L52.414 29 37.707 43.707A.997.997 0 0 1 37 44zM24.001 50a1 1 0 0 1-.978-1.214l9-41a1 1 0 0 1 1.953.429l-9 41a.999.999 0 0 1-.975.785z"
      style={{
        fill: "#2d2d2d",
      }}
    />
  </svg>
);
export default EmbeddedCodeSVG;
