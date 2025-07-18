import * as React from "react"
const BookingStatusSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g fill={props.color || "#3F65E4"} clipPath="url(#a)">
      <path
        d="M.985 15.833h18.03a1.06 1.06 0 0 0 1.06-1.06v-1.638a1.06 1.06 0 0 0-.891-1.044 2.122 2.122 0 0 1 0-4.181 1.06 1.06 0 0 0 .892-1.045V5.227a1.06 1.06 0 0 0-1.06-1.06H.984a1.06 1.06 0 0 0-1.06 1.06v1.638A1.06 1.06 0 0 0 .815 7.91a2.121 2.121 0 0 1 0 4.18 1.06 1.06 0 0 0-.892 1.045v1.638a1.06 1.06 0 0 0 1.06 1.06Zm18.03-10.606v1.638a3.182 3.182 0 0 0-.01 6.271l.01 1.637H.985v-1.638a3.182 3.182 0 0 0 .01-6.271l-.01-1.637h18.03Z"
        style={{
          fill: props.color || "#3f65e4",
          fillOpacity: 1,
        }}
      />
      <path
        d="M6.818 7.349a.53.53 0 0 0 .53-.53V4.696a.53.53 0 1 0-1.06 0v2.121a.53.53 0 0 0 .53.53ZM6.818 10a.53.53 0 0 0 .53-.53V8.41a.53.53 0 1 0-1.06 0v1.06a.53.53 0 0 0 .53.53ZM6.818 12.652a.53.53 0 0 0 .53-.53V11.06a.53.53 0 1 0-1.06 0v1.06a.53.53 0 0 0 .53.53ZM6.818 15.833a.53.53 0 0 0 .53-.53v-1.59a.53.53 0 1 0-1.06 0v1.59a.53.53 0 0 0 .53.53ZM9.47 7.879h5.303a.53.53 0 1 0 0-1.06H9.47a.53.53 0 1 0 0 1.06ZM9.47 10.53h5.303a.53.53 0 1 0 0-1.06H9.47a.53.53 0 1 0 0 1.06ZM9.47 13.182h5.303a.53.53 0 1 0 0-1.06H9.47a.53.53 0 1 0 0 1.06Z"
        style={{
          fill: props.color || "#3f65e4",
          fillOpacity: 1,
        }}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0h20v20H0z"
          style={{
            fill: "#fff",
            fillOpacity: 1,
          }}
        />
      </clipPath>
    </defs>
  </svg>
)
export default BookingStatusSVG
