import * as React from 'react';

const LikeSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 20}
    height={props.width || 20}
    viewBox="0 0 14.75 13.827"
    {...props}
  >
    <path
      data-name="Path 1317"
      d="M12.043.263a3.981 3.981 0 0 0-4.669 1.44A3.981 3.981 0 0 0 2.705.263 4.42 4.42 0 0 0 .248 5.835c.776 2.255 7.121 7.988 7.126 7.993s6.35-5.737 7.126-7.993A4.42 4.42 0 0 0 12.043.263Z"
      fill={props.color}
      opacity={props.opacity}
    />
  </svg>
);

export default LikeSVG;
