import React from 'react'

const BusSVG = (props) => {
    console.log('props.color :>> ', props.color);
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19">
        <g id="bus" transform="translate(-32)">
            <g id="Group_52850" data-name="Group 52850" transform="translate(32)">
                <path id="Path_53039" data-name="Path 53039" d="M39.841,0C35.509,0,32,.49,32,3.921v9.8a2.919,2.919,0,0,0,.98,2.176v1.745a.983.983,0,0,0,.98.98h.98a.98.98,0,0,0,.98-.98v-.98h7.841v.98a.98.98,0,0,0,.98.98h.98a.983.983,0,0,0,.98-.98V15.9a2.919,2.919,0,0,0,.98-2.176v-9.8C47.683.49,44.174,0,39.841,0ZM35.431,14.7a1.47,1.47,0,1,1,1.47-1.47A1.468,1.468,0,0,1,35.431,14.7Zm8.821,0a1.47,1.47,0,1,1,1.47-1.47A1.468,1.468,0,0,1,44.252,14.7Zm1.47-5.881H33.96v-4.9H45.722Z" transform="translate(-32)" fill={props.color ? props.color : "#aeaeb2"} />
            </g>
        </g>
    </svg>

}

export default BusSVG