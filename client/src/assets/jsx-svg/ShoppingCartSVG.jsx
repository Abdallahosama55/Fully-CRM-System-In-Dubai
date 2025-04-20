import * as React from "react";

const ShoppingCartSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 21 21" {...props}>
    <defs>
      <linearGradient
        id="ShoppingCartSVG"
        x1={0.931}
        y1={0.118}
        x2={0.067}
        y2={0.867}
        gradientUnits="objectBoundingBox">
        <stop offset="0" stopColor="#3A5EE3" />
        <stop offset="1" stopColor="#8FCAF3" />
      </linearGradient>
    </defs>
    <path
      d="M15.751 21a2.229 2.229 0 0 1-2.1-2.333 2.229 2.229 0 0 1 2.1-2.333 2.228 2.228 0 0 1 2.1 2.333 2.228 2.228 0 0 1-2.1 2.333ZM6.3 21a2.229 2.229 0 0 1-2.1-2.333 2.229 2.229 0 0 1 2.1-2.333 2.228 2.228 0 0 1 2.1 2.333A2.228 2.228 0 0 1 6.3 21Zm12.075-5.834H6.5a2.714 2.714 0 0 1-2.589-2.437l-.227-1.539V11.17L2.4 2.629A1.63 1.63 0 0 0 .845 1.167h-.32A.557.557 0 0 1 0 .584.558.558 0 0 1 .525 0h.322a2.719 2.719 0 0 1 2.572 2.333h17.057a.512.512 0 0 1 .418.232.637.637 0 0 1 .086.511l-2.1 8.167a.538.538 0 0 1-.5.423H4.82l.131.872A1.627 1.627 0 0 0 6.5 14h11.875a.586.586 0 0 1 0 1.167Z"
      fill={props.gradiant ? "url(#ShoppingCartSVG)" : props.color || "url(#ShoppingCartSVG)"}
    />
  </svg>
);

export default ShoppingCartSVG;
