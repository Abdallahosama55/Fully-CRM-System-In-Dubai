import React from 'react'

const AgendaListSVG = (props) => {
    return <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill={props.color ? props.color : "none"}
        {...props}
    >
        <path
            stroke="#313342"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.5 8h11m-11 2.5h11M2.5 13h11M3.75 3h8.5a1.25 1.25 0 0 1 0 2.5h-8.5a1.25 1.25 0 0 1 0-2.5Z"
            style={{
                stroke: "#313342",
                strokeOpacity: 1,
            }}
        />
    </svg>

}

export default AgendaListSVG