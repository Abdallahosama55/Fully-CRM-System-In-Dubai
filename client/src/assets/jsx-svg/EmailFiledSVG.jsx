import * as React from "react"
const EmailFiledSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <g fill="#3A5EE3">
            <path
                d="M1 5.78v5.72a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5.78L9.048 9.442a2 2 0 0 1-2.096 0L1 5.78Z"
                style={{
                    fill: "#3a5ee3",
                    fillOpacity: 1,
                }}
            />
            <path
                d="M15 4.605V4.5a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v.105l6.476 3.986a1 1 0 0 0 1.048 0L15 4.605Z"
                style={{
                    fill: "#3a5ee3",
                    fillOpacity: 1,
                }}
            />
        </g>
    </svg>
)
export default EmailFiledSVG
