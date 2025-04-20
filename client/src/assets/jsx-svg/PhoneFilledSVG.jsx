import * as React from "react"
const PhoneFilledSVG = (props) => (
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
            d="M1 3a2 2 0 0 1 2-2h.915c.573 0 1.073.39 1.212.947l.737 2.948A1.25 1.25 0 0 1 5.401 6.2l-.862.646c-.09.068-.109.166-.084.235a7.523 7.523 0 0 0 4.465 4.465c.069.025.167.006.235-.084l.646-.862a1.25 1.25 0 0 1 1.304-.463l2.948.737c.556.139.947.639.947 1.213V13a2 2 0 0 1-2 2h-1.5C5.701 15 1 10.299 1 4.5V3Z"
            clipRule="evenodd"
            style={{
                fill: "#3a5ee3",
                fillOpacity: 1,
            }}
        />
    </svg>
)
export default PhoneFilledSVG
