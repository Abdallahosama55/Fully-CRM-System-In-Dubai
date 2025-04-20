import * as React from 'react';

const LocationSVG = (props) => (
  <svg
    data-name="Group 1272"
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16.666 20.956"
    {...props}
  >
    <path
      data-name="Path 1342"
      d="M16.666 8.333A8.333 8.333 0 1 0 4.817 15.87l2.817 4.7a.8.8 0 0 0 .688.387.808.808 0 0 0 .688-.387l2.828-4.7a8.3 8.3 0 0 0 4.812-7.537Zm-5.709 6.193a.346.346 0 0 1-.075.043.647.647 0 0 0-.14.1.564.564 0 0 0-.108.118l-.065.065-2.247 3.738-2.247-3.74a.151.151 0 0 1-.043-.043.708.708 0 0 0-.151-.161l-.1-.065c-.032-.022-.054-.054-.1-.065a6.715 6.715 0 1 1 5.236 0Z"
      fill={props.color || '#93c850'}
    />
    <path
      data-name="Path 1343"
      d="M8.333 4.301a4.032 4.032 0 1 0 4.032 4.032 4.033 4.033 0 0 0-4.032-4.032Zm0 6.451a2.419 2.419 0 1 1 2.418-2.419 2.423 2.423 0 0 1-2.418 2.418Z"
      fill={props.color || '#93c850'}
    />
    <circle
      data-name="Ellipse 36"
      cx={3}
      cy={3}
      r={3}
      transform="translate(5 5.165)"
      fill={props.color || '#93c850'}
    />
  </svg>
);

export default LocationSVG;
