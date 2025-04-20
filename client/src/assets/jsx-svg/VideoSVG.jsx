import * as React from 'react';

const VideoSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 32 23.999"
    {...props}
  >
    <g data-name="Icon - Video">
      <path
        data-name="Union 16"
        d="M6.581 24A6.257 6.257 0 0 1 0 17.5v-11A6.257 6.257 0 0 1 6.581 0h9.269a6.255 6.255 0 0 1 6.58 6.5v11a6.255 6.255 0 0 1-6.58 6.5Zm22.152-3.806L26.362 19a2.594 2.594 0 0 1-1.422-2.331V7.332A2.589 2.589 0 0 1 26.362 5l2.371-1.2a2.214 2.214 0 0 1 2.2.1A2.292 2.292 0 0 1 32 5.858v12.286a2.284 2.284 0 0 1-1.068 1.947 2.217 2.217 0 0 1-2.2.1Z"
        fill={props.color || '#bdbdbd'}
      />
    </g>
  </svg>
);

export default VideoSVG;
