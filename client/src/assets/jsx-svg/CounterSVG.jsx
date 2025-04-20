import * as React from "react";

const CounterSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 20.16"
    {...props}
  >
    <path
      d="M23.52 9.6H.48a.48.48 0 0 0-.48.48v9.6a.48.48 0 0 0 .48.48h23.04a.48.48 0 0 0 .48-.48v-9.6a.48.48 0 0 0-.48-.48Zm-6.777 6.138A1.438 1.438 0 0 1 15.36 16.8H8.64a1.438 1.438 0 0 1-1.383-1.062.961.961 0 1 1 1-.1.472.472 0 0 0 .379.2h6.72a.472.472 0 0 0 .379-.2.96.96 0 1 1 1 .1ZM6.24 0h11.52v5.76H6.24Zm-.96.367L1.143 8.64h3.134l1-2.493Zm13.44 0v5.781l1 2.493h3.133ZM6.084 6.72l-.773 1.92h13.377l-.773-1.92Z"
      fill={props.color || "#c7c7cc"}
    />
  </svg>
);

export default CounterSVG;
