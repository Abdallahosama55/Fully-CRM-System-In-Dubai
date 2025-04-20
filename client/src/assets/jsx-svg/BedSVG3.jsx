import * as React from "react"
const BedSVG3 = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill={props.fill || "#fff"}
            d="M6 6.333a1.667 1.667 0 1 1-3.333 0 1.667 1.667 0 0 1 3.333 0ZM16 8V6.666A2.667 2.667 0 0 0 13.333 4H10a2.667 2.667 0 0 0-2.667 2.666V8H16ZM1.333 9.333V2A.667.667 0 1 0 0 2v12a.667.667 0 1 0 1.333 0v-1.334h13.334V14A.667.667 0 1 0 16 14V9.333H1.333Z"
            style={{
                fill: props.fill || "#fff",
                fillOpacity: 1,
            }}
        />
    </svg>
)
export default BedSVG3
