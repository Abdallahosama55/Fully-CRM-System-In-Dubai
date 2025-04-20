import * as React from 'react';

export default function WhiteDownArrowSVG(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 14}
      height={props.width || 14}
      viewBox="0 0 14.735 8.368"
      {...props}
    >
      <path
        d="m1.414 1.414 5.953 5.953 5.954-5.953"
        fill="none"
        stroke={props.color || '#fff'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
        data-name="Down Arrow Icon"
      />
    </svg>
  );
}
