import * as React from "react"
const UsersSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22.833 21v-2a4.002 4.002 0 0 0-3-3.874m-3.5-11.835a4.001 4.001 0 0 1 0 7.418M17.833 21c0-1.864 0-2.796-.304-3.53a4 4 0 0 0-2.165-2.165C14.629 15 13.697 15 11.834 15h-3c-1.864 0-2.796 0-3.531.305a4 4 0 0 0-2.165 2.164c-.305.735-.305 1.667-.305 3.531m11.5-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      style={{
        stroke: props.color || "#000",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default UsersSVG
