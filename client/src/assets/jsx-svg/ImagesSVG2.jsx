import * as React from "react"
const ImagesSVG2 = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={19}
        fill="none"
        {...props}
    >
        <path
            fill={props.fill || "#fff"}
            fillRule="evenodd"
            d="M16.5 12.5v-9A1.5 1.5 0 0 0 15 2H6a1.5 1.5 0 0 0-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5Zm-8.25-3 1.523 2.033L12 8.75l3 3.75H6l2.25-3Zm-6.75 6V5H3v10.5h10.5V17H3a1.5 1.5 0 0 1-1.5-1.5Z"
            clipRule="evenodd"
            style={{
                fill: props.fill || "#fff",
                fillOpacity: 1,
            }}
        />
    </svg>
)
export default ImagesSVG2
