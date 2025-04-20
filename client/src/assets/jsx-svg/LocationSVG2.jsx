import * as React from "react"
const LocationSVG2 = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill="#3A5EE3"
            fillRule="evenodd"
            d="m7.693 14.9.047.027.019.011a.507.507 0 0 0 .482 0l.018-.01.048-.027c.26-.155.515-.32.762-.495a13.05 13.05 0 0 0 1.789-1.521C12.154 11.558 13.5 9.565 13.5 7a5.5 5.5 0 0 0-11 0c0 2.564 1.347 4.558 2.642 5.885.55.56 1.148 1.069 1.788 1.521.248.175.502.34.763.495ZM8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            clipRule="evenodd"
            style={{
                fill: props.fill || "#3a5ee3",
                fillOpacity: 1,
            }}
        />
    </svg>
)
export default LocationSVG2
