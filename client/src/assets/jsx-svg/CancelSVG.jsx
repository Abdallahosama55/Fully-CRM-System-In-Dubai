import * as React from "react"
const CancelSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
        {...props}
    >
        <path
            fill="#6B7280"
            fillRule="evenodd"
            d="M8 2a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 8 2ZM6.853 6.647a.5.5 0 1 0-.706.706L7.293 8.5 6.147 9.647a.5.5 0 1 0 .706.706L8 9.207l1.147 1.146a.499.499 0 0 0 .865-.35.5.5 0 0 0-.159-.356L8.707 8.5l1.146-1.147a.5.5 0 1 0-.706-.706L8 7.793 6.853 6.647Z"
            clipRule="evenodd"
            style={{
                fill: "#6b7280",
                fillOpacity: 1,
            }}
        />
    </svg>
)
export default CancelSVG
