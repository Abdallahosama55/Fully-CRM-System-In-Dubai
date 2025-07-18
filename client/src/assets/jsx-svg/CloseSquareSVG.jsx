import React from 'react'

const CloseSquareSVG = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="24" height="24" viewBox="0 0 24 24">
        <g id="close-square" transform="translate(-108 -316)">
            <path id="Vector" d="M0,5.66,5.66,0" transform="translate(117.17 325.17)" fill="none" stroke={props?.color ? props?.color : "#292d32"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            <path id="Vector-2" data-name="Vector" d="M5.66,5.66,0,0" transform="translate(117.17 325.17)" fill="none" stroke={props?.color ? props?.color : "#292d32"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            <path id="Vector-3" data-name="Vector" d="M7,20h6c5,0,7-2,7-7V7c0-5-2-7-7-7H7C2,0,0,2,0,7v6C0,18,2,20,7,20Z" transform="translate(110 318)" fill="none" stroke={props?.color ? props?.color : "#292d32"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            <path id="Vector-4" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(108 316)" fill="none" opacity="0" />
        </g>
    </svg>

}

export default CloseSquareSVG