import * as React from "react";

const PostSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 18 18" {...props}>
    <defs>
      <linearGradient
        id="PostSVG"
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
      data-name="Path 50323"
      d="M31.111 17H17.889A1.894 1.894 0 0 0 16 18.889v13.222A1.894 1.894 0 0 0 17.889 34h13.222A1.894 1.894 0 0 0 33 32.111V18.889A1.894 1.894 0 0 0 31.111 17Zm-4.722 13.222h-6.611v-1.889h6.611Zm2.833-3.778h-9.444v-1.888h9.444Zm0-3.778h-9.444v-1.888h9.444Z"
      transform="translate(-15.5 -16.5)"
      stroke="rgba(0,0,0,0)"
      strokeMiterlimit={10}
      fill={props.color || "url(#PostSVG)"}
    />
  </svg>
);
export default PostSVG;
