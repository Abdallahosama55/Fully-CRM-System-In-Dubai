import * as React from "react";

const GroupsSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={18} {...props}>
    <path
      d="M4 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm12 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm-6 4a2 2 0 1 0 2 2 2 2 0 0 0-2-2ZM4 8a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm12 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2ZM4 14c-1.335 0-4 .721-4 2.051V18h8v-1.949C8 14.721 5.335 14 4 14Zm12 0c-1.335 0-4 .721-4 2.051V18h8v-1.949C20 14.721 17.335 14 16 14Z"
      fill={props.color || "#fff"}
    />
  </svg>
);

export default GroupsSVG;
