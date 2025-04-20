import * as React from "react"
const FileSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#344054"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.33}
      d="M9.333 1.513v2.754c0 .373 0 .56.073.703a.667.667 0 0 0 .291.29c.143.074.33.074.703.074h2.754m-2.487 3.333H5.333m5.334 2.667H5.333M6.667 6H5.333m4-4.667H5.867c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.875c-.218.427-.218.987-.218 2.107v6.934c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.988.218 2.108.218h4.266c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108V5.333l-4-4Z"
      style={{
        stroke: props.color || "#344054",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default FileSVG
