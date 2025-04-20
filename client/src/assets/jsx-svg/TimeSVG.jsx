const TimeSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16.001}
    height={16.001}
    viewBox="0 0 16 16"
    {...props}>
    <g data-name="Ball 9">
      <g fill={props.color || "#0318d6"} data-name="Group 2">
        <path
          d="M8.001 0a8 8 0 1 1-8 8 8.009 8.009 0 0 1 8-8Zm0 14.629a6.629 6.629 0 1 0-6.629-6.628 6.636 6.636 0 0 0 6.629 6.628Z"
          data-name="Ellipse 1"
        />
        <path
          d="M10.347 11.843a.736.736 0 0 1-.567-.266L7.32 8.626a.738.738 0 0 1-.171-.469V3.233a.738.738 0 1 1 1.476 0v4.653l2.286 2.747a.738.738 0 0 1-.567 1.211Z"
          data-name="Vector 3"
        />
      </g>
    </g>
  </svg>
);
export default TimeSVG;
