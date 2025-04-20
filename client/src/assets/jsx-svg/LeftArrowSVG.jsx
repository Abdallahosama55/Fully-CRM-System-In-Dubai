import * as React from "react";

const LeftArrowSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 16}
    height={props.height || 13.066}
    {...props}
  >
    <path
      fill={props.color || "#fff"}
      d="M16.001 6.533a.725.725 0 0 1-.629.717l-.1.007H2.489l4.619 4.573a.72.72 0 0 1 0 1.023.73.73 0 0 1-.947.072l-.082-.07L.215 7.046a.727.727 0 0 1-.1-.12l-.023-.039-.019-.035L.051 6.8l-.015-.042L.021 6.7l-.008-.038-.012-.056V6.462v.071a.723.723 0 0 1 .012-.134l.007-.032a.58.58 0 0 1 .018-.063l.012-.032a.6.6 0 0 1 .028-.063l.016-.029.028-.046.022-.034.006-.008a.728.728 0 0 1 .064-.072L6.082.211a.73.73 0 0 1 1.029 0 .72.72 0 0 1 .068.942l-.071.081-4.617 4.575h12.783a.725.725 0 0 1 .727.724Z"
      data-name="Iconly/Light-Outline/Arrow---Left"
    />
  </svg>
);

export default LeftArrowSVG;
