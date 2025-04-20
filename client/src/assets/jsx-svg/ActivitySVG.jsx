import React from 'react';

const ActivitySVG = ({ color = "#3F65E4", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        {...props} // This allows passing other SVG props like width, height, etc.
    >
        <path
            d="M19.1334 10H15.8001L13.3001 17.5L8.30007 2.5L5.80007 10H2.46674"
            stroke={color} // Set stroke color to the `color` prop
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ActivitySVG;
