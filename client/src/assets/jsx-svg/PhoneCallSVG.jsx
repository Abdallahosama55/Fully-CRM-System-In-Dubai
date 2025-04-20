import * as React from "react";
const PhoneCallSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill={props.color ? props.color : "#fff"}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={props.color ? props.color : "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 12.385c0-.564-.233-1.107-.674-1.459-5.308-4.235-13.344-4.235-18.652 0-.44.351-.674.895-.674 1.459v1.66a2 2 0 0 0 2.743 1.858l1.012-.405A1.98 1.98 0 0 0 7 13.659v0c0-.696.36-1.357 1.012-1.601 2.296-.86 5.68-.86 7.976 0 .652.244 1.012.905 1.012 1.601v0c0 .81.493 1.538 1.245 1.839l1.012.405A2 2 0 0 0 22 14.046v-1.661Z"
    />
  </svg>
);
export default PhoneCallSVG;
