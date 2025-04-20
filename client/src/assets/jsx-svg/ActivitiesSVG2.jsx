import * as React from "react"
const ActivitiesSVG2 = (props) => (
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
      d="M22.667 8.931c0-.605 0-.908-.12-1.049a.5.5 0 0 0-.42-.173c-.183.014-.398.228-.826.657L17.667 12l3.634 3.634c.428.429.643.643.826.657a.5.5 0 0 0 .42-.173c.12-.14.12-.444.12-1.05V8.932Z"
      style={{
        stroke: props.color || "#000",
        strokeOpacity: 1,
      }}
    />
    <path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.667 9.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.31-1.311C4.947 5 5.787 5 7.468 5h5.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.31 1.311c.328.642.328 1.482.328 3.162v4.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-5.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162V9.8Z"
      style={{
        stroke: props.color || "#000",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default ActivitiesSVG2
