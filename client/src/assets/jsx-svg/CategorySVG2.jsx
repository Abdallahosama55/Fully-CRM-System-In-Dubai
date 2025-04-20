import * as React from "react"
const CategorySVG2 = (props) => (
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
                d="M0 1.75v4.083h5.833V0H1.75C.785 0 0 .785 0 1.75Zm12.833 0c0-.965-.785-1.75-1.75-1.75H7v5.833h5.833V1.75ZM0 11.083c0 .965.785 1.75 1.75 1.75h4.083V7H0v4.083Zm13.988 2.08-1.64-1.641a2.898 2.898 0 0 0 .485-1.606A2.92 2.92 0 0 0 9.917 7 2.92 2.92 0 0 0 7 9.916a2.92 2.92 0 0 0 2.917 2.917c.593 0 1.144-.18 1.606-.486l1.64 1.64.825-.825Z"
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
export default CategorySVG2
