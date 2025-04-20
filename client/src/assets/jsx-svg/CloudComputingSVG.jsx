import * as React from "react"
const CloudComputingSVG = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={76}
        height={76}
        fill="none"
        {...props}
    >
        <rect
            width={76}
            height={76}
            fill="#F7FAFF"
            rx={38}
            style={{
                fill: "#f7faff",
                fillOpacity: 1,
            }}
        />
        <rect
            width={60}
            height={60}
            x={8}
            y={8}
            fill="#F0F6FF"
            rx={30}
            style={{
                fill: "#f0f6ff",
                fillOpacity: 1,
            }}
        />
        <path
            fill="#3A5EE3"
            d="M49.255 52.553H40.673V43.88h2.836a.887.887 0 0 0 .719-1.406l-5.517-7.634a.88.88 0 0 0-1.43 0l-5.517 7.634a.885.885 0 0 0 .719 1.406h2.836v8.672h-9.612c-4.29-.237-7.707-4.25-7.707-8.599 0-3 1.627-5.615 4.038-7.029a5.458 5.458 0 0 1-.335-1.904 5.536 5.536 0 0 1 5.541-5.542c.662 0 1.3.115 1.896.335a11.097 11.097 0 0 1 10.045-6.366c5.754.008 10.495 4.413 11.034 10.028 4.422.76 7.781 4.855 7.781 9.49 0 4.952-3.858 9.243-8.745 9.587Z"
            style={{
                fill: "#3a5ee3",
                fillOpacity: 1,
            }}
        />
    </svg>
)
export default CloudComputingSVG
