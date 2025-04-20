import * as React from "react";

const FullscreenSVG = (props) => (
  <svg
    data-name="Icon - Fullscreen"
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 28.803 28.802"
    {...props}
  >
    <path
      d="M18 0a1.2 1.2 0 1 0 0 2.4h6.7l-5.546 5.551a1.202 1.202 0 1 0 1.7 1.7L26.4 4.1v6.7a1.2 1.2 0 1 0 2.4 0V1.261A1.2 1.2 0 0 0 27.6 0Z"
      fill={props.color || "#bdbdbd"}
    />
    <path
      data-name="Vector"
      d="M2.4 18A1.2 1.2 0 0 0 0 18v9.6a1.2 1.2 0 0 0 1.263 1.2H10.8a1.2 1.2 0 1 0 0-2.4H4.1l5.55-5.55a1.202 1.202 0 0 0-1.7-1.7L2.4 24.7ZM27.6 16.8a1.2 1.2 0 0 1 1.2 1.2v9.6a1.2 1.2 0 0 1-1.26 1.2H18a1.2 1.2 0 0 1 0-2.4h6.7l-5.55-5.55a1.202 1.202 0 0 1 1.7-1.7l5.55 5.55V18a1.2 1.2 0 0 1 1.2-1.2ZM10.8 2.4a1.2 1.2 0 0 0 0-2.4H1.2A1.2 1.2 0 0 0 0 1.261V10.8a1.2 1.2 0 0 0 2.4 0V4.1l5.55 5.55a1.202 1.202 0 0 0 1.7-1.7L4.1 2.4Z"
      fill={props.color || "#bdbdbd"}
    />
  </svg>
);

export default FullscreenSVG;
