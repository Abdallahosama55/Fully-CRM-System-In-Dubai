import * as React from "react";
const GallerySVG2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" {...props}>
    <g fill="#3A5EE3" clipPath="url(#a)">
      <path
        d="M4.145 11.625a2.184 2.184 0 0 1-2.066-1.488l-.02-.067a2.127 2.127 0 0 1-.101-.632V5.46L.543 10.184a1.325 1.325 0 0 0 .928 1.607l9.02 2.416c.113.03.226.043.337.043a1.3 1.3 0 0 0 1.26-.954l.526-1.67H4.145ZM5.749 5.5a1.168 1.168 0 0 0 0-2.333 1.168 1.168 0 0 0 0 2.333Z"
        style={{
          fill: "#3a5ee3",
          fill: "color(display-p3 .2275 .3686 .8902)",
          fillOpacity: 1,
        }}
      />
      <path
        d="M13.042 1.417h-8.75a1.46 1.46 0 0 0-1.458 1.458v6.417a1.46 1.46 0 0 0 1.458 1.458h8.75a1.46 1.46 0 0 0 1.459-1.458V2.875a1.46 1.46 0 0 0-1.459-1.458Zm-8.75 1.166h8.75c.161 0 .292.131.292.292v4.141l-1.843-2.15a1.045 1.045 0 0 0-.782-.359 1.02 1.02 0 0 0-.78.368l-2.166 2.6-.706-.703a1.024 1.024 0 0 0-1.446 0L4 8.382V2.874c0-.16.13-.292.291-.292Z"
        style={{
          fill: "#3a5ee3",
          fill: "color(display-p3 .2275 .3686 .8902)",
          fillOpacity: 1,
        }}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0h14v14H0z"
          style={{
            fill: "#fff",
            fillOpacity: 1,
          }}
          transform="translate(.5 .25)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default GallerySVG2;
