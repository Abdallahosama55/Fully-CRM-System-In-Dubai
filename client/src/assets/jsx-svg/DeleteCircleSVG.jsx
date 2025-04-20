import * as React from "react";
const DeleteCircleSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}>
    <path
      fill={props.fill && props.fill}
      d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6C302.4 132 404 89.6 512 89.6c108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4zm0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
    />
    <path
      fill={props.fill && props.fill}
      d="M707.872 329.392 348.096 689.16l-31.68-31.68 359.776-359.768z"
    />
    <path fill={props.fill && props.fill} d="m328 340.8 32-31.2 348 348-32 32z" />
  </svg>
);
export default DeleteCircleSVG;
