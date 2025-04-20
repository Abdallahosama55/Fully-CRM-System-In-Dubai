import * as React from "react";

const SoundSVG = (props) => (
  <svg
    data-name="Icon - Sound"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 31.6 22.4"
    {...props}
  >
    <path
      d="M0 11.2c0 1.967-.092 4.651 1.125 5.654 1.135.936 1.934.695 4.007.847s6.452 6.251 9.827 4.322c1.741-1.369 1.87-4.239 1.87-10.823S16.7 1.746 14.962.377C11.587-1.553 7.209 4.546 5.135 4.7s-2.872-.089-4.007.847C-.089 6.549 0 9.233 0 11.2Z"
      fill={props.color || "#bdbdbd"}
    />
    <path
      data-name="Vector"
      d="M26.651.461a1.2 1.2 0 0 1 1.67.3 18.25 18.25 0 0 1 0 20.876 1.2 1.2 0 1 1-1.97-1.37 15.85 15.85 0 0 0 0-18.137 1.2 1.2 0 0 1 .3-1.669Z"
      fill={props.color || "#bdbdbd"}
    />
    <path
      data-name="Vector"
      d="M22.734 4.262a1.2 1.2 0 0 1 1.638.445 13.038 13.038 0 0 1 0 12.988 1.201 1.201 0 0 1-2.081-1.2 10.638 10.638 0 0 0 0-10.6 1.2 1.2 0 0 1 .443-1.633Z"
      fill={props.color || "#bdbdbd"}
    />
  </svg>
);

export default SoundSVG;
