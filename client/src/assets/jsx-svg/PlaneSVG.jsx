import * as React from "react"
const PlaneSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                fill={props.fill || "#313342"}
                d="M6.64 5.333 5.094 0h1.838a2 2 0 0 1 1.756 1.043l2.157 4.29H6.64Zm7.359 1.334H3.323L1.6 4.94A.933.933 0 0 0 .123 6.067L2.27 10h4.765l-2.357 6H6.72a1.98 1.98 0 0 0 1.733-1.009L11.511 10H16V8.667a2 2 0 0 0-2-2Z"
                style={{
                    fill: props.fill || "#313342",
                    fillOpacity: 1,
                }}
            />
        </g>
        <defs>
            <clipPath id="a">
                <path
                    fill="#fff"
                    d="M0 0h16v16H0z"
                    style={{
                        fill: "#fff",
                        fillOpacity: 1,
                    }}
                />
            </clipPath>
        </defs>
    </svg>
)
export default PlaneSVG
