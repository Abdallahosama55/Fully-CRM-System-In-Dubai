import * as React from "react"
const SearchSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#3F65E4"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.67}
      d="m17.5 17.5-3.625-3.625M9.167 5a4.167 4.167 0 0 1 4.166 4.167m2.5 0a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
      style={{
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default SearchSVG
