import * as React from 'react';

const SortSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox="0 0 14.826 17.366"
    {...props}
  >
    <path
      data-name="Path 1655"
      d="M10.958 13.123V6.91H9.186v6.213H6.527l3.545 3.536 3.545-3.536ZM4.758.706 1.209 4.242h2.659v6.213H5.64V4.242h2.659Z"
      fill={props?.color ? props.color : "#9f9f9f"}
      stroke="rgba(0,0,0,0)"
      strokeMiterlimit={10}
    />
  </svg>
);

export default SortSVG;
