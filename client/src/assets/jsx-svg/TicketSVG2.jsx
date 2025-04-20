import * as React from "react"
const TicketSVG2 = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={16}
        fill="none"
        {...props}
    >
        <g
            stroke="#313342"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path
                d="M10.002 2h2.879a1.5 1.5 0 0 1 1.5 1.5v2.879c0 .398-.158.78-.44 1.06l-6.387 6.388c-.466.466-1.186.581-1.738.22a12.064 12.064 0 0 1-3.482-3.482c-.361-.552-.246-1.272.22-1.738L8.941 2.44A1.5 1.5 0 0 1 10.002 2Z"
                style={{
                    stroke: "#313342",
                    strokeOpacity: 1,
                }}
            />
            <path
                d="M12.38 4h-.005v.005h.006V4Z"
                style={{
                    stroke: "#313342",
                    strokeOpacity: 1,
                }}
            />
        </g>
    </svg>
)
export default TicketSVG2
