import * as React from "react";
import { memo } from "react";
const NoteSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#FFA000"
        d="M12.397 13.952 8.311 3.62a.333.333 0 0 0-.27-.208l-6.332-.745a.329.329 0 0 0-.373.292L.003 13.624a.333.333 0 0 0 .287.374h.008l11.665 1.334H12c.172 0 .317-.13.333-.302l.087-.925a.333.333 0 0 0-.024-.153Z"
        style={{
          fill: "#ffa000",
          //   fill: "color(display-p3 1 .6275 0)",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#FFE082"
        d="M14.667 2.96a.333.333 0 0 0-.37-.293h-.003l-2.866.338-8.465.996a.333.333 0 0 0-.294.364l1 10.665c.016.172.16.303.333.302h.038l11.665-1.333a.333.333 0 0 0 .292-.373L14.667 2.96Z"
        style={{
          fill: "#ffe082",
          //   fill: "color(display-p3 1 .8784 .5098)",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#455A64"
        d="M9.668 5.333a.333.333 0 0 1-.236-.569l1.666-1.666a.333.333 0 1 1 .471.471L9.903 5.235a.333.333 0 0 1-.235.098Z"
        style={{
          fill: "#455a64",
          //   fill: "color(display-p3 .2706 .3529 .3922)",
          fillOpacity: 1,
        }}
      />
      <path
        fill="#F44336"
        d="M12.334 4a1.666 1.666 0 1 0 0-3.332 1.666 1.666 0 0 0 0 3.333Z"
        style={{
          fill: "#f44336",
          //   fill: "color(display-p3 .9569 .2627 .2118)",
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
const Memo = memo(NoteSVG);
export default Memo;
