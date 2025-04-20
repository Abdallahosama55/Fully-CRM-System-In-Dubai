import * as React from 'react';

const ManGroupSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 21.728 13.827"
    {...props}
  >
    <path
      d="M6.913 0a2.963 2.963 0 1 0 2.963 2.963A2.963 2.963 0 0 0 6.913 0Zm7.9 0a2.963 2.963 0 1 0 2.963 2.963A2.963 2.963 0 0 0 14.814 0Zm-7.9 7.9C3.951 7.9 0 9.347 0 11.358v2.469h13.827v-2.469c0-2.011-3.951-3.458-6.914-3.458Zm7.9 0c-.313 0-.639.02-.966.05a4.21 4.21 0 0 1 1.953 3.408v2.469h5.926v-2.469c.002-2.011-3.949-3.458-6.912-3.458Z"
      fill={props.color || '#fff'}
    />
  </svg>
);

export default ManGroupSVG;
