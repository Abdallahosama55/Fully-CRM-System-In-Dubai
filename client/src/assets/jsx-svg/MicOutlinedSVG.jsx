import React from "react";

function MicOutlinedSVG(props) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g id="Frame">
        <path
          id="Vector"
          d="M6 9.375C6.79565 9.375 7.55871 9.05893 8.12132 8.49632C8.68393 7.93371 9 7.17065 9 6.375V5.625M6 9.375C5.20435 9.375 4.44129 9.05893 3.87868 8.49632C3.31607 7.93371 3 7.17065 3 6.375V5.625M6 9.375V11.25M4.125 11.25H7.875M6 7.875C5.60218 7.875 5.22064 7.71696 4.93934 7.43566C4.65804 7.15436 4.5 6.77282 4.5 6.375V2.25C4.5 1.85218 4.65804 1.47064 4.93934 1.18934C5.22064 0.908035 5.60218 0.75 6 0.75C6.39782 0.75 6.77936 0.908035 7.06066 1.18934C7.34196 1.47064 7.5 1.85218 7.5 2.25V6.375C7.5 6.77282 7.34196 7.15436 7.06066 7.43566C6.77936 7.71696 6.39782 7.875 6 7.875Z"
          stroke={props.color || "white"}
          style={{
            stroke: props.color || "white",
            strokeOpacity: 1,
          }}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
}

export default MicOutlinedSVG;
