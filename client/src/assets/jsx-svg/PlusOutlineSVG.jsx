import React from "react";

const PlusOutlineSVG = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
      <g
        id="Iconly_Light-Outline_Plus"
        data-name="Iconly/Light-Outline/Plus"
        transform="translate(-1 -1)">
        <g id="Plus" transform="translate(1 1)">
          <path
            id="Combined-Shape"
            d="M7.855,0a2.989,2.989,0,0,1,3.086,3.224V7.717a2.989,2.989,0,0,1-3.086,3.224H3.086A2.989,2.989,0,0,1,0,7.717V3.224A2.989,2.989,0,0,1,3.086,0Zm0,.763H3.086A2.243,2.243,0,0,0,.763,3.224V7.717a2.243,2.243,0,0,0,2.323,2.46H7.855a2.243,2.243,0,0,0,2.323-2.46V3.224A2.243,2.243,0,0,0,7.855.763ZM5.47,3.22a.382.382,0,0,1,.382.382V5.084H7.336a.382.382,0,0,1,0,.763H5.852V7.33a.382.382,0,0,1-.763,0V5.847H3.6a.382.382,0,0,1,0-.763H5.089V3.6A.382.382,0,0,1,5.47,3.22Z"
            fill={props?.color ? props?.color : "#fff"}
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  );
};

export default PlusOutlineSVG;
