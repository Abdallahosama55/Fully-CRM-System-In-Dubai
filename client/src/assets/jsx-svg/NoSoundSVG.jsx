import * as React from "react";

const NoSoundSVG = (props) => (
  <svg
    data-name="Icon - Sound"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 29.985 22.4"
    {...props}
  >
    <path
      d="M0 11.2c0 1.967-.092 4.651 1.125 5.654 1.135.936 1.934.695 4.007.847s6.452 6.251 9.827 4.322c1.741-1.369 1.87-4.239 1.87-10.823S16.7 1.746 14.962.377C11.587-1.553 7.209 4.546 5.135 4.7s-2.872-.089-4.007.847C-.089 6.549 0 9.233 0 11.2Z"
      fill={props.color || "#bdbdbd"}
    />
    <g data-name="Group 1618" fill={props.color || "#bdbdbd"}>
      <path d="m28.99 6.82.995.995-7.766 7.765-.994-.995z" />
      <path
        data-name="Rectangle Copy 19"
        d="m22.22 6.82 7.765 7.765-.994.995-7.766-7.765z"
      />
    </g>
  </svg>
);

export default NoSoundSVG;
