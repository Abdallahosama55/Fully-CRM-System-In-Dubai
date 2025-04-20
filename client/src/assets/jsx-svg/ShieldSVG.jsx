import * as React from "react"
const ShieldSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#757177"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.302 21.615c.221.129.332.194.488.227.122.026.298.026.42 0 .156-.033.267-.098.488-.227C14.646 20.478 20 16.908 20 12V6.6c0-.558 0-.837-.107-1.05a.993.993 0 0 0-.432-.436c-.211-.11-.495-.113-1.062-.12C15.427 4.96 13.714 4.714 12 3c-1.714 1.714-3.427 1.959-6.399 1.994-.567.007-.851.01-1.062.12a.993.993 0 0 0-.432.436C4 5.763 4 6.042 4 6.6V12c0 4.908 5.354 8.478 7.302 9.615Z"
      style={{
        stroke: "#757177",
        stroke: "color(display-p3 .4588 .4431 .4667)",
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export default ShieldSVG
