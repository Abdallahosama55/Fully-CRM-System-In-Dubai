import * as React from 'react';

const VoiceSVG = (props) => (
  <svg
    data-name="Icon - Voice"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 27.2 32"
    {...props}
  >
    <path
      d="M25.65 12.522a1.54 1.54 0 0 0-1.55 1.531 10.5 10.5 0 0 1-21 0 1.54 1.54 0 0 0-1.55-1.531A1.54 1.54 0 0 0 0 14.052a13.509 13.509 0 0 0 12.051 13.335v3.08a1.55 1.55 0 0 0 3.1 0v-3.08A13.509 13.509 0 0 0 27.2 14.052a1.54 1.54 0 0 0-1.55-1.53Z"
      fill={props.color || '#bdbdbd'}
    />
    <path
      data-name="Vector"
      d="M13.32 21.147h.561a6.92 6.92 0 0 0 6.962-6.874v-7.4A6.919 6.919 0 0 0 13.881 0h-.561a6.919 6.919 0 0 0-6.96 6.876v7.4a6.92 6.92 0 0 0 6.96 6.871Z"
      fill={props.color || '#bdbdbd'}
    />
  </svg>
);

export default VoiceSVG;
