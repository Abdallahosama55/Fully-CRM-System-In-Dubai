import * as React from "react"
const MemoPadSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                fill="#313342"
                d="M1.167 2.917V1.75c0-.965.785-1.75 1.75-1.75h8.166c.965 0 1.75.785 1.75 1.75v1.167H1.167Zm11.666 1.166V14H1.166V4.083h11.667Zm-5.25 5.25h-3.5V10.5h3.5V9.333Zm2.333-2.916H4.083v1.166h5.833V6.417Z"
                style={{
                    fill: "#313342",
                    fillOpacity: 1,
                }}
            />
        </g>
        <defs>
            <clipPath id="a">
                <path
                    fill="#fff"
                    d="M0 0h14v14H0z"
                    style={{
                        fill: "#fff",
                        fillOpacity: 1,
                    }}
                />
            </clipPath>
        </defs>
    </svg>
)
export default MemoPadSVG
